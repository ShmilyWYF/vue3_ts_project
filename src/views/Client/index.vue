<template>
  <div id="client">
      <Feature :FeatureData="featureData" :loading="loading" v-slot:FeatureList="slotProp" v-slot:AppBanner="appBanner">
        <FeatureList :location="slotProp.loading" :list="slotProp.list"/>
      </Feature>
      <ArticleMain :gutter="32">
        <template #header>
          <sidebar icon="moon" title="文章列表" :show-context="false" h="auto"/>
        </template>
        <template #default>
          <Article-List-Tag/>
        </template>
        <template #aside>
          <ArticleAside/>
        </template>
      </ArticleMain>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRaw} from "vue";

const name = 'Client'
import {Feature, FeatureList} from '@/views/Client/components/Feature'
import {ArticleListTag, ArticleMain} from "@/views/Client/components/ArticleList";
import store from "@/store";
import {svg} from "@/icons";
import {ArticleAside, Sidebar} from "@/components";

const loading = ref<boolean>(true)
const featureData = ref()


onMounted(() => {
  getArticle()
})

const getArticle = () => {
  store.dispatch('articleStore/getFeatureArticle').then((res) => {
    featureData.value = toRaw(res)
    loading.value = false
  })
}


</script>

<style scoped lang="scss">


.articleMain {
  margin-bottom: 1rem;

  :deep(.el-header) {
    height: 4rem;

    .el-card {
      padding: 0;
      background: none !important;
      box-shadow: none !important;

      .el-card__body {
        display: none;
      }
    }
  }
}
</style>
