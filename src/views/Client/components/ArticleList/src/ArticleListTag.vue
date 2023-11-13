<template>
  <div class="ArticleListTag" id="ArticleListTag">
    <el-tabs @tab-click="getArticleListByCategory" v-model="articleTagActive" ref="tabRef">

      <el-tab-pane label="ALL" name="ALL">
        <template #label>
          <el-tag type="info" effect="dark">
            <span class="tag-a tag-all">{{ $t('message.ALL') }}</span>
          </el-tag>
        </template>
        <template v-for="(item,key) in data" :key="key" >
          <Article type="1" :data="item" />
        </template>
      </el-tab-pane>

      <el-tab-pane v-if="isArticleTagList" :label="$t('message.'+item.categoryName)" :name="item.categoryName" v-for="(item,key) in articleCategoryList" :key="key">
        <template #label>
          <el-tag type="info" effect="dark">
            <span class="tag-a">{{item.categoryName}}</span>
            <span class="tag-span">{{item.articleCount}}</span>
          </el-tag>
        </template>
        <template #default>
          <Article type="1" v-for="(item,key) in data" :key="key" :data="item"/>
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
import {computed, onMounted, ref} from 'vue'
import {Article} from "@/components";
import store from "@/store";
import {svg} from "@/icons";
import {ArticleInterface, CategoryCountInterface, CategoryInterface} from "@/interface";

const tabRef = ref<HTMLElement|any>()
const articleCategoryList = ref<CategoryCountInterface[]>()
// 控制渲染时机
const isArticleTagList = ref<boolean>(false)

const articleTagActive = computed(()=>store.getters.articleTagActive)

const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
// 初始化数据
const data = ref<ArticleInterface[]>()
const total = ref<ArticleInterface[]>([])

onMounted(()=>{
  getArticleCategorylist();
  getArticleListByCategory();
})

/**
 * @author WangYaFeng
 * @date 2023/10/19 23:16
 * @description 获取文章标签列表
 * @return null
 */
const getArticleCategorylist = () => {
  store.dispatch('articleStore/getArticleCategorylist').then((res: CategoryCountInterface[]) => {
        articleCategoryList.value = res
        isArticleTagList.value = true
      }
  )
}

/**
 * @author WangYaFeng
 * @date 2023/10/17 18:44
 * @description 根据所选列表导航label列出相应文章列表
 * @return null
 * @param pane
 */
const getArticleListByCategory = async (pane?:any) => {
  const label = pane?.paneName?pane.paneName : (articleTagActive.value ? articleTagActive.value : 'ALL')
  store.dispatch('articleStore/getArticleListByCategory', label).then((res: ArticleInterface[]) => {
        total.value = res
        data.value = total.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
      }
  )
}




/**
 * @author WangYaFeng
 * @date 2023/10/19 23:15
 * @description 分页触发事件
 * @return null
 * @param Pages
 */
const getCurrentChange = (Pages: number) => {
  currentPage.value = Pages;
  tabRef.value.$el.scrollIntoView();
  data.value = total.value.slice((Pages - 1) * pageSize.value, Pages * pageSize.value)
}




</script>
<style scoped lang="scss">
.ArticleListTag {
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .el-tabs {
    :deep(.el-tabs__header) {
      width: calc(100% - 8%);
      padding: 1% 3%;
      margin: 0 auto;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      @include background_color('background-color');
      @include box_shadow('box-card-shadow-tabs');

      .el-tabs__nav-wrap, .el-tabs__nav-scroll, .el-tabs__nav {
        width: 100%;
        gap: 1.25rem;

        .el-tabs__active-bar {
          bottom: 5px !important;
        }
        .el-tabs__item {
          width: auto;
          height: auto;
          padding: 0 !important;
          margin: 0 !important;

          .el-tag--info {
            padding: 0;
            border: 0;
            height: 2rem;
            background: #00000000;

            &:hover {
              opacity: .5;
            }

            .el-tag__content {
              .tag-all {
                border-bottom-right-radius: .375rem;
                border-top-right-radius: .375rem;
              }
              .tag-a {
                padding: .45rem .85rem;
                @include background_color('background-primary');
                text-decoration: inherit;
                border-bottom-left-radius: .375rem;
                border-top-left-radius: .375rem;
              }

              .tag-span {
                opacity: .7;
                border-bottom-right-radius: .375rem;
                border-top-right-radius: .375rem;
                padding: .45rem .5rem;
                @include background_color('background-primary');
                @include font_color('text-sub-accent');
              }
            }
          }
        }
      &:after {
        position: static !important;
      }
    }
  }

  :deep(.el-tabs__content) {
    height: auto;

    .el-tab-pane {
      display: grid;
      padding: 0.75rem;
      position: relative;
      // 自适应
      grid-template-rows: repeat(1, minmax(0, 1fr));
      grid-gap: 2rem;

      .Article {
        height: 25rem;

        .el-card {
          //@include box_shadow('box-card-shadow-sidebar')
          @include box_shadow('box-card-shadow-tabs')
        }
      }
    }

    @media (min-width: 980px) {
      .el-tab-pane {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: auto;
      }
    }
    @media (min-width: 1200px) {
      .el-tab-pane {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto;
      }
    }

  }
}

:deep(.el-pagination) {
  font-size: larger;
  position: relative;
  justify-content: center;
  padding: 1rem;
  z-index: 15;

  button {
    background: #00000000;
    @include font_color('text-color');

    &:disabled {
      display: none;
    }
  }

  .el-pager li {
    font-weight: 800;
    background: #00000000;
  }
}

}
#ArticleListTag {
  .is-active {
    .tag-a{
      background: $main-Np-gradient !important;
    }
  }
}

</style>
