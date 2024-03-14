<template>
  <CommentModule ref="commentsRef"
                 v-bind="reactiveData"
                 v-if="loading"
                 :commentsCall="callCommentsEvnt"
                 :index-call="indexCall"
                 :save="save"
                 style="margin-top: 1rem"/>
</template>

<script setup lang="ts">
import {CommentModule} from "@/components";
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import store from "@/store";
import {ElNotification} from "element-plus";
import {UserInfointerface} from "@/interface";

const props = defineProps<{ type: number, id?: number | string }>()
const {type, id} = toRefs(props)

const loading = ref(false)

onMounted(() => {
  getArticleCommentsList()
})
// 初始化变量
const reactiveData = reactive({
  // 需要返回的引索
  index: 0,
  // 评论数据
  commentData: [] as any,
  // 是否显示 加载更多评论按钮
  isHaveMore: undefined as any,
  // 后端分页初始化
  current: 1,
  size: 7,
  // 是否重新加载all数据
  isReload: false,
  // 设置评论类型
  type: type,
  // 是否需要审核
  isCommentReview: store.getters.useState.websiteConfig.commentReview||0,
  // 用户信息
  userinfo: computed<UserInfointerface>(()=>store.getters.userinfo || undefined),
  formAvatar: store.getters.useState.userConfig?.avatar || undefined
})

// 更新引索函数
const indexCall = (value: number) => {
  reactiveData.index = value
}

// 评论操作调用事件
const callCommentsEvnt = (evntName: string) => {
  switch (evntName) {
    case 'comment':
      reactiveData.current = 1;
      reactiveData.isReload = true;
      getArticleCommentsList();
      break;
    case 'replies':
      fetchReplies(reactiveData.index);
      break; // index从遍历的评论某条获取回复
    case 'loadMore':
      reactiveData.isHaveMore = false
      getArticleCommentsList();
      break; // 初始化获取数据
  }
}

// 获取comments事件
const getArticleCommentsList = () => {
  const params: { type: number, current: number, size: number, topicId?: number | string } = {
    type: reactiveData.type,
    current: reactiveData.current,
    size: reactiveData.size,
    topicId: id?.value,
  }
  api.commentApi.getCommentListByType(params).then((res: AxiosResponse) => {
    const {data} = <{ message: string, data: { commentList: [], count: number } }>res.data
    // 是否重新获取数据 不是则push分页返回的数据
    if (reactiveData.isReload) {
      reactiveData.commentData = data.commentList
      reactiveData.isReload = false
    } else {
      reactiveData.commentData.push(...data.commentList)
    }
    // more 找到的数据总数大于已储存的数据量 则为true 代表还存在新数据
    if (data.count === reactiveData.commentData.length) {
      reactiveData.isHaveMore = undefined;
    } else {
      reactiveData.isHaveMore = data.count > reactiveData.commentData.length;
    }
    reactiveData.current++
  })
  loading.value = true
}

// 获取回复 响应式添加
const fetchReplies = (indexValue: number) => {
  let id = reactiveData.commentData[indexValue].id
  api.commentApi.getRepliesByCommentId({id}).then((res: AxiosResponse) => {
    const {data} = res.data
    reactiveData.commentData[indexValue].replys = data.replys
  })
}

// 保存消息   采用异步方式 不能使用emit
const save = async (params: any) => {
  return new Promise<any>(resolve => {
    api.commentApi.saveComments(params).then(() => {
      // 当前被回复评论的引索 为当前回复评论添加内容
      if (reactiveData.index&&reactiveData.commentData[reactiveData.index]){
        fetchReplies(reactiveData.index);
      }
      resolve('')
    }, (e: Error) => {
      ElNotification.error('回复消息出现异常' + e.message)
    })
  })
}
</script>


<style scoped lang="scss">

</style>
