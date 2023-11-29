<template>
  <div class="commentList-box">
    <transition-group name="fade">
      <CommentItems v-for="(comment, index) in commentData" :key="comment.id" :commentData="comment" :index="index">
        <template #childComment="slotProp">
          <CommentItems v-for="reply in slotProp.commentReplyData.replys" :commentData="reply"/>
        </template>
      </CommentItems>
      <el-button v-if="haveMore" class="button-three"  @click="loadMore">
        Load More
      </el-button>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import CommentItems from "@/components/Comments/CommentItem/index.vue";
import store from "@/store";
import {provide} from "vue";

const props = defineProps<{ commentData: any, haveMore: boolean }>()
const emit = defineEmits(['callObjectType', 'callListIndex'])

// 父变量,供子组件使用 高度耦合
provide('emitCall', (fnName: string, index?: number | string) => {
  if (index) {
    emit('callListIndex', index)
  }
  emit('callObjectType', fnName)
})

// 相关页面加载更多评论事件
const loadMore = async () => {
  switch (store.getters.commentType) {
    case 1:
      emit('callObjectType', 'articleLoadMore')
      break
    case 2:
      emit('callObjectType', 'messageLoadMore')
      break
    case 3:
      emit('callObjectType', 'aboutLoadMore')
      break
    case 4:
      emit('callObjectType', 'friendLinkLoadMore')
      break
    case 5:
      emit('callObjectType', 'talkLoadMore')
  }
}

</script>

<style lang="scss" scoped>
.commentList-box {
  display: flex;
  flex: 1;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}
@media screen and (min-width: 1024px) {
  .commentList-box {
    width: inherit;
  }
}

.button-three {
  color: #fff;
  margin: .5rem auto;
  background-color: #f1c40f;
  text-shadow: -2px 2px 2px rgb(209 132 0),
  -2px 2px 2px rgb(209 132 0),
  -2px 2px 2px rgb(209 132 0),
  -2px 2px 2px rgb(209 132 0),
  -2px 2px 2px rgb(209 132 0),
  -2px 2px 2px rgb(209 132 0);
  box-shadow: 0 15px 0 0 #f39c12;
  transition: all 1s;
  &:hover {
    background-color: #fcdc5e;
  }
  &:active {
    transform: translate(0,4px);
    box-shadow: 0 1px 0 0 #f39c12;
  }
}
</style>
