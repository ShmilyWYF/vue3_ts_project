<template>
  <div class="articleEditor">
    <Mark v-if="isLoading" :content="articleContent" :edit-mode="true" @unMarkbefor="saveArticleCache" @save-cache="saveArticleCache" @full-screen="markFullScreenEvnt" @exit-evnt="router.push({path: '/Dashboard/mark/articleList'})"/>
  </div>
</template>

<script lang="ts" setup>
import {Mark} from "@/components";
import store from "@/store";
import {ref, toRefs} from "vue";
import {useRoute} from 'vue-router';
import {ElNotification} from "element-plus";
import router from "@/router";

const route = useRoute()
const props = defineProps(['LayoutMain'])
const {LayoutMain} = toRefs(props)

const id = ref(route.query?.id)
const articleContent = ref<string>()
const isLoading = ref<boolean>(false)

// 获取文章上下文
store.dispatch('articleStore/getArticleContentById', id.value).then(res => {
  articleContent.value = res
  isLoading.value = true
})

// 保存文章
const saveArticleCache = (centent: string) => {
  try {
    store.dispatch('articleStore/updateArticleContextById', {id: id.value, articleContent: centent}).then(() => {
      ElNotification({
        title: '通知',
        message: '文章保存成功~',
        type: 'success'
      })
    }).catch((e:any)=>{
      throw new Error(e)
    })
  }catch (e) {
    ElNotification({
      title: '通知',
      message: '更新文章出错'+e,
      type: 'error'
    })
  }
}

// 解决层级问题
const markFullScreenEvnt = (args: boolean) => {
  const el: HTMLElement = <HTMLElement>document.getElementById("layoutMain");
  el.style.zIndex = args ? '15' : '10'
}

</script>

<style lang="scss" scoped>
.articleEditor {
  padding: 1rem;
  max-height: 90%;
  flex-direction: row !important;

  :deep(.mark) {
    flex: 1;
  }
}
</style>

