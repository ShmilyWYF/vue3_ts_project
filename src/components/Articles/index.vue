<template>
  <ArticleMain :gutter="8" aside-class="articleContentAside" :background="'#00000000'" header-class="articleContentheader" main-class="articleContentMarkdown">
    <template #header>
      <span>
        <b>
          <span>
            {{ content.categoryName }}
          </span>
        </b>
        <ul>
          <li v-for="(item,key) in content?.tags" :key="key">
            <em># {{ item.tagName }}</em>
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
              <span>{{ parseInt(String(content.articleContent.length/100))/10 }}K</span>
              </span>
          <span>
                <svg-icon name="moon"/>
              <span>{{ Math.round(HTMLContent(content.articleContent).length / 400) }}mins</span>
              </span>
        </div>
      </div>
    </template>
    <template #default v-if="isLoading">
        <Mark :key="content.id" ref="markRef" :content="content.articleContent" :edit-mode="mode" @markTocEvnt="markTocEvnt"/>
        <comments ref="commentsRef" :commentData="reactiveData.comments" :commentsCall="callCommentsEvnt" :indexCall="setIndexFn" :is-have-more="haveMore" style="margin-top: 1rem"/>
    </template>
    <template #aside>
      <ArticleToc :top-distance="25" :to-ref="commentsRef" v-show="ArticleTocLoad"/>
    </template>
  </ArticleMain>
</template>
<script lang="ts" setup>
import {timeZh} from "@/utils/timeZH";
import {ArticleMain, ArticleToc, Comments, Mark, SvgIcon} from "@/components";
import tocbot from 'tocbot'
import {computed, onBeforeMount, reactive, ref, toRefs} from "vue";
import store from "@/store";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import {ArticleInterface} from "@/interface";

const props = defineProps(['id', 'mode'])
const {id} = toRefs(props)
const isLoading = ref<boolean>(false)
const ArticleTocLoad = ref<boolean>(false)
// 需要返回的引索
const index = ref<number | string>(0)
const setIndexFn = (value: number | string) => {
  index.value = value
}

onBeforeMount(async () => {
  // 提交store缓存 设置类型为1
  store.commit('commentStore/SET_COMMENT_TYPE', 1)
  store.dispatch('articleStore/getArticleById', id?.value).then((res:ArticleInterface) => {
    Object.assign(content,res)
    isLoading.value = true
    getArticleCommentsList()
  })
})

// 文章上下文
const content = reactive<ArticleInterface>({
  id: 0,
  articleCover: '',
  articleTitle: '',
  articleContent: '',
  isTop: 0,
  isFeatured: 0,
  isDelete: 0,
  author: {
    avatar:'',
    nickname:'',
    createTime: 0,
    email: "",
    id: undefined,
    intro: "",
    isDisable: 0,
    isSubscribe: 0,
    updateTime: 0,
    website: ""
  },
  categoryName: '',
  tags: null,
  status: 0,
  createTime: '',
  updateTime: '',
 });

// 初始化变量
const reactiveData = reactive({
  comments: [] as any,
  haveMore: false as any,
  isReload: false as any,
})

// 评论组件Ref
const commentsRef = ref<any>()

// 文章上下文处理
const HTMLContent = (content: any):string => {
  return content
      .replace(/<\/?[^>]*>/g, '')
      .replace(/[|]*\n/, '')
      .replace(/&npsp;/gi, '')
}

// 后端分页初始化
const pageInfo = reactive({
  current: 1,
  size: 7
})

// 是否剩余可加载评论
const haveMore = computed(() => reactiveData.haveMore)

// 评论操作调用事件
const callCommentsEvnt = (evntName: string) => {
  switch (evntName) {
    case 'articleFetchComment':
      pageInfo.current = 1;
      reactiveData.isReload = true;
      getArticleCommentsList();
      break;
    case 'articleFetchReplies':
      fetchReplies(index.value);
      break; // index从遍历的评论某条获取回复
    case 'articleLoadMore':
      reactiveData.haveMore = false
      getArticleCommentsList();
      break; // 初始化获取数据
  }
}

// 获取comments事件
const getArticleCommentsList = () => {
  const params = {
    type: 1,
    topicId: id?.value,
    current: pageInfo.current,
    size: pageInfo.size
  }
  // reactiveData.haveMore = true
  api.commentApi.getCommentListByType(params).then((res: AxiosResponse) => {
    const {data} = res.data
    if (!data) {
      ElMessage.error('获取失败')
    }
    // 是否重新获取数据 不是则push分页返回的数据
    if (reactiveData.isReload) {
      reactiveData.comments = data.list
      reactiveData.isReload = false
    } else {
      reactiveData.comments.push(...data.list)
    }
    // more 找到的数据总数大于已储存的数据量 则为true 代表还存在新数据
    reactiveData.haveMore = data.count > reactiveData.comments.length;
    pageInfo.current++
  })
}

// 获取回复 响应式添加
const fetchReplies = (indexValue: number | string) => {
  let id = reactiveData.comments[indexValue].id
  api.commentApi.getRepliesByCommentId(id).then((res: AxiosResponse) => {
    const {data} = res.data
    reactiveData.comments[indexValue].replys = data.replys
  })
}

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
