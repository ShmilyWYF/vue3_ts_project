<template>
  <div class="commentForm-box">
    <el-avatar :size="50" src="https://static.linhaojun.top/aurora/config/2af2e2db20740e712f0a011a6f8c9af5.jpg"/>
    <div class="comment">
      <textarea v-model="commentContent" cols="30" placeholder="Add comment..." rows="5"/>
      <div style="text-align: right">
        <el-button id="submit-button" @click="saveComment">
          <span>Add Comment</span>
        </el-button>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElNotification} from "element-plus";
import store from "@/store";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {useRoute} from "vue-router";

// 评论上下文
const commentContent = ref<string>('')
const emit = defineEmits(['callObjectType'])
// 当前路由获取的id
const router = useRoute();
const id = router.path.split('/')[2]

// 保存评论事件
const saveComment = () => {
  if (!store.getters.userinfo||store.getters.userinfo == '') {
    ElNotification({
      title: 'Warning',
      message: '请登陆后评论',
      type: 'warning'
    })
    return
  }
  if (commentContent.value.trim() === '' && commentContent.value.length === 0) {
    ElNotification({
      title: 'Warning',
      message: '请输入评论内容',
      type: 'warning'
    })
    return;
  }
  const params: any = {
    commentContent: commentContent.value,
    type: store.getters.commentType,
    userId: store.getters.userinfo.id,
    topicId: id
  }
  // 保存评论
  try {
    api.commentApi.saveComments(params).then((res: AxiosResponse) => {
      const {data} = res.data
      loadCommentData()
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

const loadCommentData = async () => {
  switch (store.getters.commentType) {
    case 1:
      emit('callObjectType', 'articleFetchComment')
      break
    case 2: // 当前页为留言板留言板调用事件
      emit('callObjectType', 'messageFetchComment')
      break
    case 3: // 当前页为关于板留言板调用事件
      emit('callObjectType', 'aboutFetchComment')
      break
    case 4: // 当前页为友链留言板调用事件
      emit('callObjectType', 'friendLinkFetchComment')
      break
    case 5: // 当前页为留言板留言板调用事件
      emit('callObjectType', 'talkFetchComment')
  }
}

</script>

<style lang="scss" scoped>
.commentForm-box {
  display: flex;
  flex: 1;
  gap: .5rem;
  width: inherit;
  .el-avatar {
    width: auto;
    flex-shrink: 0;
  }

  .comment {
    display: flex;
    flex: 1;
    flex-wrap: wrap-reverse;
    flex-direction: column;
    @include font_color('text-color');

    textarea {
      min-height: 10rem;
      padding: 1rem 0;
      text-indent: 10px;
      resize: none;
      border-radius: .5rem;
      line-height: inherit;
      color: inherit;
      border: none;
      font-family: inherit;
      font-size: larger;
      @include background_color('background-comment');
      @include box_shadow('box-card-showow-comment');
      overflow: auto;

      &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }

    div {
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

    hr {
      width: 100%;
    }
  }
}
@media screen and (min-width: 1024px){
  .commentForm-box{
    width: calc(100% - 4rem);
    padding: 1rem 2rem 0;
  }
}
</style>
