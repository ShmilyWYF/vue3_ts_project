<template>
  <div class="commentForm-box">
    <el-avatar :size="50" :src="avatar"/>
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
import {ComputedRef, inject, ref} from "vue";
import {ElNotification} from "element-plus";
import {useRoute} from "vue-router";
import {UserInfoInterface} from "@/interface";

withDefaults(defineProps<{ avatar?: string }>(), {
  avatar: 'src/assets/commentDefaultAvater.png'
})

// 评论类型
const commentType = inject<number>('commentType')
// 评论审核
const commentReview = inject<number>('commentReview')
// 回复框 展示用户头像
const userinfo = inject<ComputedRef<UserInfoInterface>>('userinfo')
// 获取父组件save回调函数
const saveCommentEvnt: any = inject('saveComment')

// 评论上下文
const commentContent = ref<string>('')
const emit = defineEmits(['callObjectType','callListIndex'])
// 当前路由获取的id
const router = useRoute();
const id = router.path.split('/')[2]

// 保存评论事件
const saveComment = async () => {
  if (userinfo?.value == undefined) {
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
    type: commentType,
    userId: userinfo.value.id,
    topicId: id
  }
  // 重置引索
  emit('callListIndex', undefined)
  //  提交保存
  await saveCommentEvnt(params).then(()=>{
    // 获取配置 是否开启审核
    if (commentReview) {
      ElNotification.warning("评论成功,正在审核中");
    } else {
      ElNotification.success("回复成功");
    }
  })
  commentContent.value = ''
  loadCommentData()
}

const loadCommentData = () => {
  emit('callObjectType', 'comment')
}

</script>

<style lang="scss" scoped>
.commentForm-box {
  display: flex;
  flex: 1;
  gap: .5rem;
  width: inherit;

  .el-avatar {
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

@media screen and (min-width: 1024px) {
  .commentForm-box {
    width: calc(100% - 4rem);
    padding: 1rem 2rem 0;
  }
}
</style>
