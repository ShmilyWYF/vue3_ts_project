<template>
  <Sidebar ref="sidebarCommentRef" h="auto" icon="moon" title="评论区" ul-li-class="sidebarClass">
    <template #defulet>
      <!--仅一层直接使用props即可-->
      <comment-Form @call-object-type="commentsCall" @call-list-index="indexCall" :avatar="formAvatar"/>
      <comment-List :commentData="commentData" :have-more="isHaveMore" @call-object-type="commentsCall"
                    @call-list-index="indexCall"/>
    </template>
  </Sidebar>
</template>

<script lang="ts" setup>
import {Sidebar} from "@/components";
import {CommentForm, CommentList} from "./index";

import {provide, ref, toRefs} from "vue";
import {UserInfoInterface} from "@/interface";

const props = defineProps<{
  commentData: any,
  isHaveMore: boolean | undefined,
  type: number,
  isCommentReview: number,
  userinfo: UserInfoInterface | undefined,
  commentsCall: Function,
  indexCall: Function,
  formAvatar?: string,
  save: Function
}>()
const {type, isCommentReview, userinfo, save} = toRefs(props);


// 评论类型
provide('commentType', type.value)
// 评论审核
provide('commentReview', isCommentReview.value)
// 获取用户信息
provide('userinfo', userinfo)
// 保存评论事件
provide('saveComment', async (params: {
  type: number,
  replyUserId?: number,
  parentId?: number,
  commentContent: string,
  userId: number,
  topicId?: number
}) => {
  return save.value(params)
})

const sidebarCommentRef = ref<HTMLElement>()

defineExpose({
  sidebarCommentRef
})
</script>
<style lang="scss" scoped>
.sidebar {
  .el-avatar {
    flex-shrink: 0;
  }

  :deep(.el-card) {
    .el-card__body {
      width: 100%;
      display: flex;
      flex-direction: column;

      .sidebarClass {
        width: calc(100% - .75rem);
        padding: 0 .75rem;
        flex-direction: column !important;
        align-items: flex-start !important;
      }
    }
  }
}
</style>
