<template>
  <div id="ArticleListCategory" class="ArticleListCategory">
    <el-tabs ref="tabRef" v-model="articleCategoryActive" @tab-click="getArticleListByCategory">
      <el-tab-pane label="ALL" name="ALL">
        <template #label>
          <el-tag effect="dark" type="info">
            <span class="tag-a tag-all">{{ $t('message.ALL') }}</span>
          </el-tag>
        </template>
        <template #default>
          <el-skeleton :loading="data.length === 0">
            <template #template>
              <ArticleCard :data="{} as ArticleInterface" type="1" :loading="true"/>
            </template>
            <template #default>
              <transition-group name="fade">
                <template v-for="(item,key) in data" :key="key">
                  <ArticleCard :data="item" type="1"/>
                </template>
              </transition-group>
            </template>
          </el-skeleton>
        </template>
      </el-tab-pane>
      <el-tab-pane v-for="(item,key) in articleCategoryList" v-if="isArticleCategoryList" :key="key"
                   :label="$t('message.'+item.categoryName)" :name="item.categoryName">
        <template #label>
          <el-tag effect="dark" type="info">
            <span class="tag-a">{{ firstCharacterToUppercase(item.categoryName) }}</span>
            <span class="tag-span">{{ item.articleCount }}</span>
          </el-tag>
        </template>
        <template #default>
          <transition-group name="fade">
            <ArticleCard v-for="(item,key) in data" :key="key" :data="item" type="1"/>
          </transition-group>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-skeleton :loading="!isArticleCategoryList" animated class="tabs-skeleton">
      <template #template>
        <el-skeleton-item style="padding: 0.65rem 1rem;width: 3rem;margin: 0 1rem" v-for="index in 2"/>
      </template>
    </el-skeleton>

    <Svg-Icon name="more" class="tabs-btn-svg" ref="btnRef" @click="btnClick" size="2"
              v-show="articleCategoryList.length > 8"/>
    <el-pagination
        :current-page="currentPage"
        :next-icon="svg('kaoyu')"
        :page-size="pageSize"
        :prev-icon="svg('jitui')"
        :total="total.length"
        hide-on-single-page
        layout="prev, pager, next"
        @current-change="getCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {SvgIcon,ArticleCard} from "@/components";
import store from "@/store";
import {svg} from "@/icons";
import {ArticleInterface, CategoryCountInterface} from "@/interface";
import {firstCharacterToUppercase} from "@/utils/util";

const tabRef = ref<{ $el: HTMLDivElement } | any>()
const articleCategoryList = ref<CategoryCountInterface[]>([])
// 控制渲染时机
const isArticleCategoryList = ref<boolean>(false)
const btnRef = ref<{ $el: HTMLButtonElement } | any>()
const isBtnClick = ref<boolean>(false)
const articleCategoryActive = ref(store.getters.categoryActive ? store.getters.categoryActive : "ALL")

const currentPage = ref<number>(1)
const pageSize = ref<number>(12)
// 初始化数据
const data = ref<ArticleInterface[]>([])
const total = ref<ArticleInterface[]>([])

onMounted(() => {
  getCategoryList();
  getArticleListByCategory();
})

/**
 * @author WangYaFeng
 * @date 2023/10/19 23:16
 * @description 获取文章分类列表
 * @return null
 */
const getCategoryList = () => {
  store.dispatch('categoryStore/getCategorylist').then((res: CategoryCountInterface[]) => {
        articleCategoryList.value = res
        // 加载文章列表
        isArticleCategoryList.value = true
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
const getArticleListByCategory = (pane: any = null) => {
  const label = pane?.paneName ? pane.paneName : (articleCategoryActive.value ? articleCategoryActive.value : 'ALL')
  store.dispatch('articleStore/getArticleListByCategory', firstCharacterToUppercase(label)).then((res: ArticleInterface[] | undefined) => {
        if (res == undefined) {
          data.value = [];
          total.value = [];
          return;
        }
        currentPage.value = 1;
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
  const {$el} = <{ $el: HTMLDivElement }>tabRef.value;
  $el.scrollIntoView();
  data.value = total.value.slice((Pages - 1) * pageSize.value, Pages * pageSize.value)
}

// 展开按钮事件
const btnClick = () => {
  const {$el} = btnRef.value
  let tab = <{ $el: HTMLElement }>tabRef.value
  let child = <HTMLElement>tab.$el.children[0].children[0].children[0].children[0];
  if (!isBtnClick.value) {
    $el.style.transform = 'rotate(-90deg)'
    child.style.height = 'auto'
  } else {
    $el.style.transform = 'rotate(0deg)'
    child.style.height = '3rem'
  }
  isBtnClick.value = !isBtnClick.value
}

</script>
<style lang="scss" scoped>
@import "@/style/fade.css";

.ArticleListCategory {
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .el-tabs {
    :deep(.el-tabs__header) {
      width: calc(100% - 8%);
      margin: 0 auto 1rem;
      padding: 0 1rem 1rem;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      @include background_color('background-color');
      @include box_shadow('box-card-shadow-tabs');

      .el-tabs__nav-wrap, .el-tabs__nav-scroll, .el-tabs__nav {
        width: 95%;
        gap: 1.25rem;

        .el-tabs__active-bar {
          display: none;
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
                padding: 0.65rem 1rem;
                @include background_color('background-primary');
                @include font_color('text-color');
                text-decoration: inherit;
                border-bottom-left-radius: .375rem;
                border-top-left-radius: .375rem;
              }

              .tag-span {
                opacity: .7;
                border-bottom-right-radius: .375rem;
                border-top-right-radius: .375rem;
                padding: 0.65rem .5rem;
                @include background_color('background-primary');
                @include font_color('text-sub-accent');
              }
            }
          }
        }

        &:after {
          position: static !important;
        }

        .el-tabs__nav-prev, .el-tabs__nav-next {
          display: none;
        }
      }

      .el-tabs__nav {
        overflow-y: hidden;
        height: 3rem;
        flex-wrap: wrap
      }

      @media screen and (max-width: 1024px) {
        .el-tabs__nav {
          flex-wrap: wrap;
          height: auto;
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

  .tabs-btn-svg {
    position: absolute;
    right: 5rem;
    top: 0;
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

#ArticleListCategory {
  .is-active {
    .tag-a {
      background: $main-Np-gradient !important;
    }
  }
}

.tabs-skeleton {
  width: initial;
  position: absolute;
  left: 7rem;
  top: 7px;
}

.el-skeleton {
  @include skeleton();
}

</style>
