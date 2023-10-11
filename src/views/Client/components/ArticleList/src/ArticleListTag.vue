<template>
  <div class="ArticleListTag">
    <el-tabs @tab-click="getArticleListByName" v-model="activeName" id="anchorPoint">
      <el-tab-pane :label="$t('message.'+item)" :name="item" v-for="(item,key) in listName" :key="key">
        <template v-for="(item,key) in data" :key="key">
          <Article type="1" :data="item"/>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
        hide-on-single-page
        :next-icon="svg('kaoyu')"
        :prev-icon="svg('jitui')"
        @current-change="getCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total.length"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, toRaw} from 'vue'
import {Article} from "@/components";
import store from "@/store";
import {onMounted} from "vue";
import {svg} from "@/icons";

const data = ref([])
const listName = ['ALL', 'Docker']
const activeName = computed(() => store.getters.activeName)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref([])

onMounted(() => {
  getArticleListByName()
})


const getArticleListByName = async (tab?: any) => {
  const label = tab ? toRaw(tab?.props)?.name : (activeName.value ? activeName.value : 'ALL')
  console.log(label)
  store.dispatch('articleStore/getArticleListByName', label).then((res: []) => {
        total.value = res
        data.value = total.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
      }
  )
}

const getCurrentChange = (val: any) => {
  currentPage.value = val;
  const scrollDom = document.getElementById('anchorPoint');
  scrollDom?.scrollIntoView();
  data.value = total.value.slice((val - 1) * pageSize.value, val * pageSize.value)
}


</script>
<style scoped lang="scss">
@media (max-width: 1024px) {
  .ArticleListTag {
    height: auto !important;
  }
}
.ArticleListTag {
  height: 100%;
  .el-tabs {
    height: 95%;
    display: flex;
    flex-direction: column;
    ::v-deep .el-tabs__header {
      height: 2%;
      margin: 0 0 2% 0;
      padding: 1% 3%;
      border-radius: 0.5rem;
      @include background_color('background-color');
      box-shadow: var(--box-card-shadow-tabs);
      .el-tabs__nav-wrap, .el-tabs__nav-scroll, .el-tabs__nav {
        width: 100%;
        margin-bottom: 1.5%;
        .el-tabs__active-bar {
          bottom: 5px !important;
        }
        @media (max-width: 1024px) {
          .el-tabs__item{
            padding: 5% !important;
            margin: 0 3% 0 0 !important;
          }
        }
        .el-tabs__item {
          width: auto;
          height: auto;
          color: white;
          padding: 1%;
          margin: 0 1% 0 0;
          @include background_color('background-color-child');
          border-radius: .25rem;
        }
        .el-tabs__item.is-active {
          color: #067df9 !important;
          background: var(--main-Np-gradient) !important;
        }
        &:after {
          position: static !important;
        }
      }
    }

    ::v-deep .el-tabs__content {
      //overflow: visible;
      height: 95%;

      @media (min-width: 1024px) {
         .el-tab-pane{
           height: 98% !important;
           grid-template-rows: repeat(4, minmax(0,10fr))!important;
           grid-template-columns: repeat(3, 31.5%);
           grid-gap: 1.25% 2%;
           .Article{
             height: 100%;
           }
        }
      }
      .el-tab-pane {
        display: grid;
        position: relative;
        grid-template-rows: repeat(1, minmax(0,1fr));
        height: auto;
        .Article {
          height: 95%;
          .el-card{
            box-shadow: #11111AB3 0 4px 16px, #11111AB3 0 8px 24px, #11111A4D 0 16px 56px;
          }
        }
      }
    }
  }
  .el-pagination {
    font-size: larger;
    position: relative;
    justify-content: center;
  }
}
:global(.el-pagination button){
  background: #00000000;
  @include font_color('text-color-p')
}
:global(.el-pagination button:disabled){
    display: none;
}
:global(.el-pager li){
  font-weight: 800;
  background: #00000000;
}

</style>
