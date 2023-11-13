<template>
  <div id="client">
    <el-row :gutter="0" justify="center">
      <el-col :xs="{span: 24}" :md="{span: 22}" :lg="{span: 20}">
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
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRaw} from "vue";
import {Feature, FeatureList} from '@/views/Client/components/Feature'
import {ArticleAside, ArticleListTag} from "@/views/Client/components/ArticleList";
import store from "@/store";
import {ArticleMain, Sidebar} from "@/components";
import {ArticleInterface, FeatureDatainterface} from "@/interface";

const name = 'Client'

const loading = ref<boolean>(true)
const featureData = reactive<FeatureDatainterface>({
  LIST: [],
  TOP: {}
})

localStorage.setItem('IsSwitchPage',JSON.stringify(false))

onMounted(() => {
  getArticle()
})

const getArticle = () => {
  store.dispatch('articleStore/getFeatureArticle').then((res:FeatureDatainterface) => {
    featureData.TOP = res.TOP
    featureData.LIST = res.LIST
    loading.value = false
  })
}

</script>

<style scoped lang="scss">
.el-row {
  align-items: center;
  height: inherit;

  .el-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: inherit;
    gap: 2rem;
  }
}
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
