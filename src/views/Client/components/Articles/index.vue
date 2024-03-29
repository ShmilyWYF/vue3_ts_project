<template>
  <ArticleMain :gutter="8" aside-class="articleContentAside" :background="'#00000000'"
               header-class="articleContentheader" main-class="articleContentMarkdown">
    <template #header v-if="isLoading">
      <span>
        <b>
          <span>
            {{ content.categoryName }}
          </span>
        </b>
        <ul>
          <li v-for="(item,key) in content?.tags" :key="key">
            <em># {{ firstCharacterToUppercase(item.tagName) }}</em>
          </li>
        </ul>
      </span>
      <h1>
        {{ content.articleTitle }}
      </h1>
      <div class="sticker">
        <div class="sticker-box">
          <img :src="content.author.avatar" alt="头像">
          <span>
                <strong>
                    {{ content.author.nickname }}
                </strong>
                <span>
                  发布于 {{ timeZh(content.createTime) }}
                </span>
          </span>
        </div>
        <div class="sticker-statistics">
              <span>
                <svg-icon name="moon"/>
              <span>{{ parseInt(String(content.articleContent.length / 100)) / 10 }}K</span>
              </span>
          <span>
                <svg-icon name="moon"/>
              <span>{{ Math.round(HTMLContent(content.articleContent).length / 400) }}mins</span>
              </span>
        </div>
      </div>
    </template>
    <template #default>
      <Mark :key="content.id" ref="markRef" v-model="content.articleContent" @markTocEvnt="markTocEvnt"/>
      <Comment :type="1" :id="id" ref="commentsRef"/>
    </template>
    <template #aside>
      <ArticleToc :top-distance="25" :to-ref="commentsRef" v-show="ArticleTocLoad"/>
    </template>
  </ArticleMain>
</template>
<script lang="ts" setup>
import {timeZh} from "@/utils/timeZH";
import {ArticleMain, ArticleToc, Comment, Mark, SvgIcon} from "@/components";
import tocbot from 'tocbot'
import {onBeforeMount, reactive, ref, toRefs} from "vue";
import store from "@/store";
import {ArticleInterface} from "@/interface";
import {firstCharacterToUppercase} from "@/utils/util";

// 获取文章id 通过router
const props = defineProps(['id', 'mode'])
const {id, mode} = toRefs(props)
const isLoading = ref<boolean>(false)
// 文章导航
const ArticleTocLoad = ref<boolean>(false)
// 文章上下文
const content = reactive<ArticleInterface>({} as ArticleInterface);
// 文章上下文处理
const HTMLContent = (content: any): string => {
  return content
      .replace(/<\/?[^>]*>/g, '')
      .replace(/[|]*\n/, '')
      .replace(/&npsp;/gi, '')
}
// 评论组件Ref
const commentsRef = ref<any>()

onBeforeMount(async () => {
  store.dispatch('articleStore/getArticleById', {id: id?.value}).then((data: ArticleInterface) => {
    Object.assign(content, data)
    isLoading.value = true
  })
})

// 渲染文章导航栏
const markTocEvnt = (container: string) => {
  ArticleTocLoad.value = true
  tocbot.init({
    tocSelector: '#toc',
    contentSelector: container,
    headingSelector: 'h1, h2, h3, h4, h5',
    hasInnerContainers: true,
    onClick: function (e) {
      e.preventDefault()
    }
  })
}

</script>
<style lang="scss" scoped>
.articleMain {
  opacity: 1;

  :deep(.articleContentheader) {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border: none;
    padding: 2rem 3.25rem;

    span {
      position: relative;

      b {
        border-radius: .375rem;
        display: inline-flex;
        font-size: .75rem;
        line-height: 1rem;
        opacity: .9;
        padding: .125rem;
        --tw-text-opacity: 1;
        @include font_color('text-color-anti');
        text-transform: uppercase;
        text-shadow: 0 2px 2px rgba(0, 0, 0, .5);
      }

      ul {
        display: inline-flex;
        padding-left: 0.75rem;

        li {
          font-size: .875rem;
          line-height: 1.25rem;
          margin-right: .75rem;
          opacity: .7;
          --tw-text-opacity: 1;
          @include font_color('text-color-anti');
          text-shadow: 0 2px 2px rgba(0, 0, 0, .5);

          em {
            opacity: .5;
          }
        }
      }

    }

    h1 {
      margin-top: .5rem;
      margin-bottom: 1rem;
      font-size: clamp(1.2rem, 1rem + 3.5vw, 4rem);
      text-shadow: 0 2px 2px rgba(0, 0, 0, .5);
      line-height: 1.1;
      font-weight: inherit;
      @include font_color('text-color-anti');
    }

    .sticker {
      margin-top: 2rem;
      margin-bottom: 1rem;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      display: flex;

      .sticker-box {
        justify-content: flex-start;
        font-size: .875rem;
        line-height: 1.25rem;
        margin-right: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          border-style: solid;
          display: block;
          vertical-align: middle;
          max-width: 100%;
          border-radius: 9999px;
          margin-right: .5rem;
          height: 28px;
          width: 28px;
          cursor: pointer;
        }

        span {
          @include font_color('text-color-anti');
          opacity: .8;

          strong {
            @include font_color('text-color-anti');
            padding-right: .375rem;
            cursor: pointer;
            font-weight: bolder;
          }

          > span {
            opacity: .7;
          }
        }
      }

      @media (min-width: 1024px) {
        .sticker-box {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      .sticker-statistics {
        display: none;
        flex-direction: row;
        font-size: .875rem;
        line-height: 1.25rem;
        margin-right: 1rem;

        span {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-right: .25rem;
          padding-left: .1rem;
          stroke: currentColor;
          --tw-text-opacity: 1;
          @include font_color('text-color-anti');
          opacity: .8;
          gap: 0 0.23rem;

          > span {
            opacity: .7;
          }
        }
      }

      @media (min-width: 1024px) {
        .sticker-statistics {
          display: flex;
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }
    }
  }

  :deep(.articleContentMarkdown) {
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :deep(.articleContentAside) {
    padding: 20px;
    width: auto;
    overflow: unset;
    position: relative;
    top: 0;
  }

  .articleContentMarkdown, .articleContentAside {
    padding: 1.25rem 0;
  }
}
</style>
