<template>
  <div id="client">
    <el-row :gutter="0" justify="center">
      <el-col :lg="{span: 20}" :md="{span: 22}" :xs="{span: 24}">
        <Feature v-slot:AppBanner="appBanner" v-slot:FeatureList="slotProp" :FeatureData="featureData"
                 :loading="loading">
          <FeatureList :list="slotProp.list" :location="slotProp.loading"/>
        </Feature>
        <ArticleMain :gutter="32">
          <template #header>
            <sidebar :show-context="false" h="auto" icon="moon" title="文章列表"/>
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
import {onMounted, reactive, ref} from "vue";
import {Feature, FeatureList} from '@/views/Client/components/Feature'
import {ArticleAside, ArticleListTag} from "@/views/Client/components/ArticleList";
import store from "@/store";
import {ArticleMain, Sidebar} from "@/components";
import {FeatureDatainterface} from "@/interface";

const name = 'Client'

const loading = ref<boolean>(true)
const featureData = reactive<FeatureDatainterface>({
  LIST: [],
  TOP: {}
})

localStorage.setItem('IsSwitchPage', JSON.stringify(false))

onMounted(() => {
  getArticle()
})

const getArticle = () => {
  store.dispatch('articleStore/getFeatureArticle').then((res: FeatureDatainterface) => {
    featureData.TOP = res.TOP
    featureData.LIST = res.LIST
    loading.value = false
  })
}

</script>

<style lang="scss" scoped>
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
