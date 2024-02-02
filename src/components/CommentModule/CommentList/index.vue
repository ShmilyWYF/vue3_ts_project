<template>
  <div class="commentList-box">
    <transition-group name="fade">
      <CommentItem v-for="(comment, index) in commentData" :key="comment.id" :commentData="comment"
                    :index="index as number">
        <template #childComment="slotProp">
          <CommentItem v-for="reply in sortList(slotProp.commentReplyData.replys)" :commentData="reply"
                        :index="index as number"/>
        </template>
      </CommentItem>
    </transition-group>
    <el-button v-if="haveMore" class="button-three" @click="loadMore">
      Load More
    </el-button>
    <LoadingCircle v-else v-show="haveMore != undefined" style="margin: 0 auto"/>
  </div>
</template>
<script lang="ts" setup>
import {CommentItem} from "@/components/CommentModule";
import {provide} from "vue";
import {CommentInterface} from "@/interface";
import {LoadingCircle} from "@/components/Animation";

const props = defineProps<{ commentData: any, haveMore: boolean|undefined }>()
const emit = defineEmits(['callObjectType', 'callListIndex'])
// 父变量,供子组件使用 高度耦合 提交事件
provide('emitCall', (fnName: string, index: number) => {
  emit('callListIndex', index)
  emit('callObjectType', fnName)
})

// 相关页面加载更多评论事件
const loadMore = async () => {
  emit('callObjectType', 'loadMore')
}

// 排序
const sortList = (data: CommentInterface[]) => {
  return data.sort((a, b) => {
    return Date.parse(String(a.createTime)) - Date.parse(String(b.createTime))
  })
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
    transform: translate(0, 4px);
    box-shadow: 0 1px 0 0 #f39c12;
  }
}
</style>
