<template>
  <Sidebar h="auto" icon="moon" title="评论区" ul-display="none">
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
import {toRefs} from "vue";

const props = defineProps<{ commentData: any, commentsCall: Function, isHaveMore: boolean, indexCall: Function }>()
const {commentsCall} = toRefs(props)

</script>
<style lang="scss" scoped>
.sidebar {
  .el-avatar {
    flex-shrink: 0;
  }

  :deep(.el-card) {
    .el-card__body {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
