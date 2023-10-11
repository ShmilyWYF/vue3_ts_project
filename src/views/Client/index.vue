<template>
    <el-backtop target=".main" :visibility-height="800" style="z-index: 30;" :element-loading-svg="svg('xuegao')"/>

    <Feature :FeatureData="featureData" :loading="loading" v-slot:FeatureList="slotProp" v-slot:AppBanner="appBanner">
      <FeatureList :location="slotProp.loading" :list="slotProp.list"/>
    </Feature>

    <ArticleMain>
      <template #default>
        <Article-List-Tag/>
      </template>
      <template #aside>
        aside
      </template>
    </ArticleMain>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, toRaw} from "vue";

const name = 'Client'
import {Feature, FeatureList} from '@/views/Client/components/Feature'
import {ArticleListTag, ArticleMain} from "@/views/Client/components/ArticleList";
import store from "@/store";
import {svg} from "@/icons";

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
@media (min-width: 1024px) {
  .el-backtop {
    right: 2% !important;
    bottom: 1% !important;
    position: fixed;
  }
}
</style>
