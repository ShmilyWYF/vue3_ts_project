<template>
  <div class="tag-list">
    <span>
      {{ title }}
    </span>
    <transition name="floatA">
      <div class="tag-list-box" v-if="isShowTagList">
        <el-skeleton animated :loading="tagList.length === 0">
          <template #template>
            <div style="display: flex;gap: 1rem">
              <el-skeleton-item variant="button" v-for="index in 5" :key="index"/>
              <span style="font-weight: 800;font-size: xx-large">#</span>
            </div>
          </template>
          <template #default>
            <el-tag effect="dark" type="info" size="large" v-for="item in tagList" :key="item.id">
              <template #default>
                <router-link class="tag-a" :to="'/tags?tagName='+item.tagName" @click="setCurrentTagId(item.id)">
                  {{ item.tagName }}
                </router-link>
                <span class="tag-span">{{ item.articleCount }}</span>
              </template>
            </el-tag>
            <span style="font-weight: 800;font-size: xx-large">#</span>
          </template>
        </el-skeleton>
      </div>
    </transition>
    <transition-group name="floatB">
      <div v-if="!isShowTagList" class="tag-list-article-box">
        <Article v-for="(item,key) in articleList" :key="key" :data="item" type="1" h="25rem"/>
      </div>
    </transition-group>
    <br/>
    <Comment :type="2"/>
  </div>
</template>

<script setup lang="ts">
import api from "@/axios";
import {AxiosResponse} from "axios";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {Article, Comment} from "@/components";
import {close, start} from "@/utils/nporgress";
import {ElMessage} from "element-plus";
import {ArticleInterface} from "@/interface";

const tagList = ref<[{ id: number, tagName: string, articleCount: number, }]>([] as any)
const currId = ref<number>(parseInt(String(localStorage.getItem('currTagId'))));
const isShowTagList = ref<boolean>(true)
const articleList = ref<ArticleInterface[]>()
// 评论组件加载
const isCommentLoading = ref<boolean>(false)
const title = ref<string>('Tags')

// 监听路由变化
const router = useRouter();
onMounted(() => {
  getData()
})

watch(() => router.currentRoute.value.query, async () => {
  if (router.currentRoute.value.path.includes('tags')) {
    await getData()
  }
})

const setCurrentTagId = (value: number) => {
  currId.value = value;
  // 添加缓存
  localStorage.setItem('currTagId', String(value))
}

// 无参数 获取标签列表 有参数 按参数标签名获取文章列表
const getData = async () => {
  const query = router.currentRoute.value.query;
  if (!query.hasOwnProperty('tagName') || isNaN(currId.value)) {
    // 有tagName参数但没有tagId 返回标签列表
    await router.replace({path: '/tags'})
    title.value = 'Tags'
    await api.tagsApi.getTags().then((res: AxiosResponse) => {
      const {data} = res.data
      tagList.value = data;
      isCommentLoading.value = true;
    })
    isShowTagList.value = true
  } else {
    title.value = tagNameParsing(String(query.tagName))
    await redirectLabel(currId.value)
  }
}

// 获取相关标签的所有文章
const redirectLabel = async (tagId: number) => {
  start()
  await api.articleApi.getArticleListByTags({tag: tagId}).then((res: AxiosResponse) => {
    const {data} = res.data
    articleList.value = data
    ElMessage.success(title.value + '：' + articleList.value?.length + '条')
  }, (e: any) => {
    throw new Error('获取' + title.value + '标签文章出错!' + e)
  }).finally(() => {
    close()
    isShowTagList.value = false;
  })
}

// 转换空格为++
const tagNameParsing = (value: string) => {
  let tagName: string | [] | any = <string>value
  if (value.indexOf(" ") != -1) {
    tagName = []
    let arr: string[] = value.split('')
    while (arr.length !== 0) {
      let shift: string = <string | any>arr.shift()
      shift.indexOf(" ") != -1 ? tagName.push('+') : tagName.push(shift)
    }
    tagName = tagName.join('')
  }
  return tagName
}
</script>

<style lang="scss" scoped>
.tag-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 3rem 3rem;

  > span:nth-child(1) {
    font-size: xxx-large;
    font-weight: 800;
    padding: 1rem .5rem;
  }

  .tag-list-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    height: auto;
    padding: 5rem;
    border-radius: .75rem;
    @include background_color('background-color');

    .el-tag {
      padding: 0;
      border: none;
      font-size: large;
      font-weight: 600;
      background: inherit;

      &:hover {
        opacity: .7;
      }

      .tag-a {
        color: inherit;
        padding: .35rem .75rem;
        @include background_color('background-primary');
        text-decoration: inherit;
        border-bottom-left-radius: .375rem;
        border-top-left-radius: .375rem;
        @include font_color('text-color')
      }

      .tag-span {
        border-bottom-right-radius: .375rem;
        border-top-right-radius: .375rem;
        padding: .35rem .5rem;
        @include background_color('background-primary');
        opacity: .7;
        @include font_color('text-sub-accent');
      }
    }
  }

  .tag-list-article-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    flex: 1;

    .Article {
      flex-basis: 100%;
    }

    @media screen and (min-width: 1200px) {
      .Article {
        flex-basis: 49%;
      }
    }
    @media screen and (min-width: 1600px) {
      .Article {
        flex-basis: 32%;
      }
    }
    @media screen and (min-width: 1800px) {
      .Article {
        flex-basis: 24.25%;
      }
    }
  }
}

.el-skeleton {
  @include skeleton();
}

.floatA-enter-active, .floatA-leave-active,.floatB-enter-active, .floatB-leave-active, {
  transition: opacity 1.5s;
}

.floatA-enter, .floatA-leave-to ,.floatB-enter, .floatB-leave-to {
  opacity: 0;
}

.floatA-leave-active ,.floatB-leave-active {
  animation: axisLeave 1.5s;
}

.floatA-enter-active {
  animation: axisEnterA 1.5s;
}

.floatB-enter-active {
  animation: axisEnterB 1.5s;
}


@keyframes axisEnterA {
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes axisEnterB {
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%);
  }
}

@keyframes axisLeave {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(500%);
  }
}
</style>
