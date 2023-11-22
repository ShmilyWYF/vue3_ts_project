<template>
  <div class="comment-reply-form">
    <el-avatar :size="40" :src="userinfo?userinfo.avatar:'https://static.linhaojun.top/aurora/config/2af2e2db20740e712f0a011a6f8c9af5.jpg'"/>
    <div class="comment-content-box">
      <textarea v-model="commentContent" :placeholder="initialContent" cols="30" rows="5"/>
      <div>
        <el-button id="submit-button" size="small" type="primary" @click="commentContent = '';emit('cancelReply')">
          <span>Cancel</span>
        </el-button>
        <el-button id="submit-button" size="small" type="success" @click="saveReply">
          <span>Reply</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, ref, toRefs} from "vue";
import store from "@/store";
import {ElNotification} from "element-plus";
import {useRoute} from "vue-router";
import api from "@/axios";
import {AxiosResponse} from "axios";

const props = defineProps<{ replyUserId: number, initialContent: string, parentId: number, index?: number | string}>()
// 回复用户id、初始化内容、父评论id
const {initialContent, replyUserId, parentId, index} = toRefs(props)
// 关闭回复框事件
const emit = defineEmits(['cancelReply'])
// 评论内容双向绑定
const commentContent = ref<string>('')
// 回复框 展示用户头像
const userinfo = computed(() => store.getters.userinfo)
// 当前路由获取的id
const router = useRoute();
const id = router.path.split('/')[2]
// 获取父组件回调函数
const emitCallV: any = inject('emitCall')

// 保存回复事件
const saveReply = () => {
  if (userinfo.value === ''||userinfo.value === undefined) {
    ElNotification({
      title: 'Warning',
      message: '请登陆后评论',
      type: 'warning'
    })
    return;
  }
  if (commentContent.value.trim() == '') {
    ElNotification({
      title: 'Warning',
      message: '回复不能为空',
      type: 'warning'
    })
    return
  }
  const params: any = {
    type: store.getters.commentType,
    replyUserId: replyUserId?.value,
    parentId: parentId?.value,
    commentContent: commentContent.value
  }
  params.topicId = id
  try {
    api.commentApi.saveComments(params).then((res: AxiosResponse) => {
      const {data} = res.data
      if (!data) {
        throw new Error('回复消息出现异常')
      }
      // 关闭回复框
      emit('cancelReply')
      fetchReplies()
      // 获取配置 是否开启审核
      let isCommentReview = store.getters.useState.isCommentReview
      if (isCommentReview) {
        ElNotification({
          title: 'Warning',
          message: '评论成功,正在审核中',
          type: 'warning'
        })
      } else {
        ElNotification({
          title: 'Success',
          message: '回复成功',
          type: 'success'
        })
      }
      commentContent.value = ''
    })
  } catch (e: any) {
    ElNotification({
      title: '错误',
      message: e,
      type: 'error'
    })
  }
}

const fetchReplies = async () => {
  switch (store.getters.commentType) {
    case 1:
      emitCallV('articleFetchReplies', index?.value)
      break
    case 2:
      emitCallV('messageFetchReplies', index?.value)
      break
    case 3:
      emitCallV('aboutFetchReplies', index?.value)
      break
    case 4:
      emitCallV('friendLinkFetchReplies', index?.value)
      break
    case 5:
      emitCallV('talkFetchReplies', index?.value)
  }
}

</script>

<style lang="scss" scoped>
.comment-reply-form {
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;

  .el-avatar {
    flex-shrink: 0;
  }

  .comment-content-box {
    width: fit-content;
    display: flex;
    flex-direction: column;
    margin: 0 1.25rem;
    @include font_color('text-color');

    textarea {
      resize: none;
      padding: .5rem;
      border-radius: .5rem;
      color: inherit;
      border: none;
      font-family: inherit;
      font-size: large;
      @include background_color('background-comment');
      @include box_shadow('box-card-showow-comment');
      overflow: auto;

      &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }

    > div {
      text-align: right;

      .el-button {
        outline: none;
        background: $main-Np-gradient;
        padding: 1rem .75rem;
        margin-top: 1.25rem;
        border-radius: .375rem;
        border: none;
        font-weight: 800;
        color: inherit;
        transition: all 0.6s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
