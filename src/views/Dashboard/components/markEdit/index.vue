<template>
  <div class="articleEditor">
    <Mark v-if="isLoading" :content="articleContent" :edit-mode="true" @unMarkbefor="saveArticleCache" @save-cache="saveArticleCache" @full-screen="markFullScreenEvnt" @exit-evnt="router.push({path: '/Dashboard/mark/articleList'})"/>
  </div>
</template>

<script lang="ts" setup>
import {Mark} from "@/components";
import {ref, toRefs} from "vue";
import {useRoute} from 'vue-router';
import {ElMessage, ElNotification} from "element-plus";
import router from "@/router";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {getKebabCase} from "@/utils/util";

const route = useRoute()
const props = defineProps(['LayoutMain'])
const {LayoutMain} = toRefs(props)

const id = ref<string|any>(route.query?.id)
const articleContent = ref<string>()
const isLoading = ref<boolean>(false)

// 获取文章上下文
api.articleApi.getArticleContentById({id:id.value}).then((res: AxiosResponse) => {
  const {data,code,message,type} = res.data
  ElMessage({message:message,type:type})
  if(code != 200){
    return
  }
  articleContent.value = data
  isLoading.value = true
})


// 保存文章
const saveArticleCache = async (centent: string) => {
  const param = {
    "id": parseInt(id.value),
    "field": getKebabCase("article_content"),
    "value": String(centent)
  }
  await api.articleApi.updateArticleByField(param).then(({data}:AxiosResponse) => {
    ElNotification({
      title: '通知',
      message: data.message,
      type: data.type
    })
  })
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

