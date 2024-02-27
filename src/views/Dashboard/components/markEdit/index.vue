<template>
  <div class="articleEditor">
    <Mark v-model="reactiveDate.articleContent" :edit-mode="true" @unMarkbefor="saveArticleCache" @save-cache="saveArticleCache" @full-screen="markFullScreenEvnt" @exit-evnt="router.push({path: '/Dashboard/mark/articleList'})"/>
  </div>
</template>

<script lang="ts" setup>
import {Mark} from "@/components";
import {onBeforeMount, reactive, toRefs} from "vue";
import {useRoute} from 'vue-router';
import {ElNotification} from "element-plus";
import router from "@/router";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {getKebabCase} from "@/utils/util";

const route = useRoute()
const props = defineProps(['LayoutMain'])
const {LayoutMain} = toRefs(props)

const reactiveDate = reactive<{currid:string,articleContent:string}>({
  currid: <string>route.query?.id,
  articleContent: ''
})


onBeforeMount(()=>{
  getArticleContent();
})

// 获取文章上下文
const getArticleContent = () => {
  const param = {
    id: reactiveDate.currid
  }
  api.articleApi.getArticleContentById(param).then((res: AxiosResponse) => {
    const {data,message} = res.data
    ElNotification.success(message)
    reactiveDate.articleContent = data
  },(e:Error)=>{
    ElNotification.error(e.message)
  })

}

// 保存文章
const saveArticleCache = async (centent: string) => {
  const param = {
    "id": parseInt(reactiveDate.currid),
    "field": getKebabCase("article_content"),
    "value": String(centent)
  }
  await api.articleApi.updateArticleByField(param).then(({data}:AxiosResponse) => {
    ElNotification.success(data.message)
  },(e:Error)=>{
    ElNotification.error(e.message)
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

