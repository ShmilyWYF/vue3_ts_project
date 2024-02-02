<template>
  <div class="comment-reply-form">
    <el-avatar :size="50"
               :src="userinfo?userinfo.avatar:'https://c-ssl.duitang.com/uploads/blog/202206/26/20220626195022_d538d.jpeg'"/>
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
import {inject, ref, toRefs} from "vue";
import {ElNotification} from "element-plus";
import {useRoute} from "vue-router";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {UserInfoInterface} from "@/interface";

const props = defineProps<{ replyUserId: number, initialContent: string, parentId: number, index: number}>()
// 回复用户id、初始化内容、父评论id
const {initialContent, replyUserId, parentId, index} = toRefs(props)
// 关闭回复框事件
const emit = defineEmits(['cancelReply'])
// 评论内容双向绑定
const commentContent = ref<string>('')
// 当前路由获取的id
const router = useRoute();
const id = router.path.split('/')[2]

// 获取父组件回调函数
const emitCallV: any = inject('emitCall')
// 获取父组件save回调函数
const saveCommentEvnt: any = inject('saveComment')
// 评论类型
const commentType = inject<number>('commentType')
// 评论审核
const commentReview = inject<number>('commentReview')
// 回复框 展示用户头像
const userinfo:UserInfoInterface|undefined = inject<any>('userinfo')

// 保存回复事件
const saveReply = async () => {
  if (userinfo === undefined) {
    ElNotification.warning("请登陆后评论~")
    return;
  }
  if (commentContent.value.trim() == '') {
    ElNotification.warning("回复不能为空~")
    return
  }
  const params: any = {
    type: commentType,
    replyUserId: replyUserId?.value,
    parentId: parentId?.value,
    commentContent: commentContent.value,
    userId: userinfo.id,
  }
  params.topicId = id
  // 关闭回复框
  emit('cancelReply')
  // 返回引索
  await emitCallV('callListIndex', index.value)
  //  提交保存
  await saveCommentEvnt(params)
  // 获取配置 是否开启审核
  if (commentReview) {
    ElNotification.success('评论成功,正在审核中~')
  } else {
    ElNotification.success('回复成功')
  }
  commentContent.value = ''
}

</script>

<style lang="scss" scoped>
.comment-reply-form {
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
  gap: 0.75rem;

  .el-avatar {
    flex-shrink: 0;
  }

  .comment-content-box {
    width: inherit;
    display: flex;
    flex-direction: column;
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

  @media screen and (max-width: 1024px) {
    .comment-content-box {
      max-width: 12.5rem;
    }
  }
}
</style>
