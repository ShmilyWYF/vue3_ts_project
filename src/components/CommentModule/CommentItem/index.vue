<template>
<div>
  <div class="comment-item-box">
    <el-avatar :size="50" :src="commentData.avatar"/>
    <div class="content-box">
      <div class="content">
        <p class="commentContent" v-html="commentData.commentContent.replaceAll('\n', '<br>')"/>
        <div>
          <span>{{ commentData.nickname }} | {{ initData.time }}</span>
          <div>
            <span @click="initData.show = true">Reply</span>
          </div>
        </div>
      </div>
      <transition-group name="fade">
        <slot :commentReplyData="commentData" name="childComment"/>
      </transition-group>
      <CommentReplyForm v-if="commentData.replys" v-show="initData.show" :index="index" :initialContent="initData.replyContent" :parentId="commentData.id!" :replyUserId="commentData.userId" @cancel-reply="cancelReply"/>
    </div>
  </div>
  <CommentReplyForm v-if="!commentData.replys" v-show="initData.show" :index="index" :initialContent="initData.replyContent" :parentId="commentData.id!" :replyUserId="commentData.userId" @cancel-reply="cancelReply"/>
</div>
</template>

<script lang="ts" setup>
import {reactive, toRefs} from 'vue'
import {CommentInterface, initDataInterface} from "@/interface";
import {CommentReplyForm} from "@/components/CommentModule";
const props = defineProps<{ commentData: CommentInterface, index: number}>()
const {commentData, index} = toRefs(props)

// 初始化数据
const initData = reactive<initDataInterface>({
  replyContent: 'add reply...',
  time: commentData.value.createTime,
  show: false
})

// 取消回复事件
const cancelReply = () => {
  initData.replyContent = 'add reply...'
  initData.show = false
}

</script>

<style lang="scss" scoped>
.comment-item-box {
  display: flex;
  gap: .75rem;
  max-width: 100%;

  .el-avatar {
    flex-shrink: 0;
  }

  .content-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .content {
      width: fit-content;
      position: relative;
      padding: 1rem 1rem 1rem 1.5rem;
      border-radius: .375rem;
      @include background_color('background-comment');
      @include box_shadow('box-card-showow-comment');
      // 会覆裁剪阴影
      //clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 5% 35%, 0 25%, 5% 15%);
      &:before {
        content: "";
        width: .75rem;
        height: .75rem;
        background-color: inherit;
        left: -5px;
        position: absolute;
        transform: rotate(45deg);
        top: 30%;
        margin-top: -5px;
      }

      .commentContent {
        line-height: 26px;
        white-space: pre-line;
        word-wrap: break-word;
        word-break: break-all;
        font-size: large;
        @include font_color('text-color');
      }

      > div {
        line-height: 1rem;
        font-size: .75rem;
        margin-top: .75rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        @include font_color('text-color-primary');

        > div {
          margin-left: 4rem;
          color: #24c6dc;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
