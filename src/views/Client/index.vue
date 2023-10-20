<template>
  <div>
    <el-row :gutter="0" class="row-feature-box" justify="center">
      <el-col :xs="{span: 24}" :md="{span: 22}" :lg="{span: 20}">
        <Feature :FeatureData="featureData" :loading="loading" v-slot:FeatureList="slotProp" v-slot:AppBanner="appBanner">
          <FeatureList :location="slotProp.loading" :list="slotProp.list"/>
        </Feature>
      </el-col>
    </el-row>

    <ArticleMain class="ArticleMain">
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


    <el-backtop target=".main" :visibility-height="800" style="z-index: 30;" :element-loading-svg="svg('xuegao')"/>

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
.row-feature-box{
  height: 180%
}
.ArticleMain{
    :deep(.el-header){
      height: 4rem;
      .el-card{
        padding: 0;
        background: none !important;
        box-shadow: none !important;
        .el-card__body{
          display: none;
        }
      }
    }
}

@media (min-width: 1024px) {
  .el-backtop {
    right: 2% !important;
    bottom: 1% !important;
    position: fixed;
  }
}
@media (min-width: 1024px) {
  .row-feature-box{
    height: 120%
  }
}
</style>
