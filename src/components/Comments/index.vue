<template>
  <Sidebar ref="sidebarCommentRef" h="auto" icon="moon" title="评论区" ul-li-class="sidebarClass">
    <template #defulet>
      <!--仅一层直接使用props即可-->
      <comment-Form @call-object-type="commentsCall"/>
      <comment-List :commentData="commentData" :have-more="isHaveMore" @call-object-type="commentsCall" @call-list-index="indexCall"/>
    </template>
  </Sidebar>
</template>

<script lang="ts" setup>
import {Sidebar} from "@/components";
import CommentForm from './CommentForm/index.vue'
import CommentList from './CommentList/index.vue'
import {ref, toRefs} from "vue";

const props = defineProps<{ commentData: any, commentsCall: Function, isHaveMore: boolean, indexCall: Function }>()
const {commentsCall} = toRefs(props)
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
      .sidebarClass{
      width: calc(100% - .75rem);
      padding: 0 .75rem;
      flex-direction: column !important;
      align-items: flex-start !important;
      }
    }
  }
}
</style>
