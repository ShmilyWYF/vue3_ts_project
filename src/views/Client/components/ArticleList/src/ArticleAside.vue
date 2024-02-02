<template>
  <div class="ArticleAside">
    <Introduction :data="data.introduction" style="height: 26.5rem;"/>
    <el-skeleton :loading="data.commentsList.length === 0" animated class="tabs-skeleton">
      <template #template>
        <Sidebar icon="moon" title="最新评论" h="auto">
          <template #defulet>
            <div style="display: flex;flex-direction: column;gap: 1rem">
              <div style="display: flex;gap: 1rem" v-for="index in 6">
                <el-skeleton-item variant="circle" style="width: 2.25rem;height: 2.25rem"/>
                <div style="display:flex;flex: 1;flex-direction:column;gap: .75rem">
                  <el-skeleton-item variant="text"/>
                  <el-skeleton-item variant="p" style="width: 50%"/>
                </div>
              </div>
            </div>
          </template>
        </Sidebar>
      </template>
      <template #default>
        <Sidebar :data="data.commentsList.slice(0, 6)" h="auto" icon="moon" title="最新评论">
          <template #content="slotProps:{item:CommentInterface}">
            <div class="imageFrame">
              <el-avatar :size="40" :src="slotProps.item.avatar"/>
            </div>
            <div class="comments">
              <span>{{ slotProps.item.nickname }}</span>
              <p style="overflow: hidden;text-overflow: ellipsis;">{{ slotProps.item.createTime }}</p>
              <div class="commentContent">{{ slotProps.item.commentContent }}</div>
            </div>
          </template>
        </Sidebar>
      </template>
    </el-skeleton>
    <el-skeleton :loading="data.tags.length === 0" animated class="tabs-skeleton">
      <template #template>
        <Sidebar icon="moon" title="标签目录">
          <template #defulet>
            <div style="display: flex;flex-direction: row;gap: 1rem;flex-wrap: wrap;">
              <el-skeleton-item variant="p" style="height: 1.5rem;width: 3.5rem;" v-for="index in 5"/>
            </div>
          </template>
        </Sidebar>
      </template>
      <template #default>
        <Sidebar :data="data.tags.slice(0,15)" :ul-li-style="{padding: '0',margin: '0'}" h="auto" icon="moon"
                 title="标签目录"
                 ul-display="flex">
          <template #content="slotProps:{item:Tagsinterface}">
            <el-tag effect="dark" type="info">
              <template #default>
                <router-link class="tag-a" :to="'/tags?tagName=' + slotProps.item.tagName">{{
                    slotProps.item.tagName
                  }}
                </router-link>
                <span class="tag-span">{{ slotProps.item.articleCount }}</span>
              </template>
            </el-tag>
          </template>
          <template #defulet>
            <p class="el-tag-p" @click="router.push({path:'/tags'})">{{ $t('message.ViewMore') }}...</p>
          </template>
        </Sidebar>
      </template>
    </el-skeleton>
    <el-skeleton :loading="data.notice.length === 0" animated class="tabs-skeleton">
      <template #template>
        <Sidebar h="auto" icon="moon" title="公告">
          <template #defulet>
            <el-skeleton/>
          </template>
        </Sidebar>
      </template>
      <template #default>
        <Sidebar h="auto" icon="moon" title="公告">
          <template #defulet>
            <p>
              {{ data.notice }}
            </p>
          </template>
        </Sidebar>
      </template>
    </el-skeleton>
    <el-skeleton :loading="data.websiteInformation.length === 0" animated class="tabs-skeleton">
      <template #template>
        <Sidebar icon="moon" title="网站信息" h="auto">
          <template #defulet>
            <div style="display: flex;flex-direction: column;gap: 1rem;">
              <el-skeleton-item variant="rect" style="height: 2.5rem"/>
              <el-skeleton-item variant="rect" style="height: 2.5rem"/>
            </div>
          </template>
        </Sidebar>
      </template>
      <template #default>
        <Sidebar :data="data.websiteInformation" :ul-li-style="{'justify-content':'space-between'}" h="auto" icon="moon"
                 title="网站信息">
          <template #content="slotProps">
            <span>
             {{ slotProps.item.title }}
            </span>
            <span>
             {{ slotProps.item.value }}
            </span>
          </template>
        </Sidebar>
      </template>
    </el-skeleton>
  </div>
</template>
<script lang="ts" setup>
import {Introduction, Sidebar} from "@/components";
import {onBeforeMount, onUnmounted, reactive, ref} from "vue";
import store from "@/store";
import {ArticleAsideinterface, CommentInterface, IntroductionInterface, Tagsinterface} from "@/interface";
import router from "@/router";

const data = reactive<ArticleAsideinterface>({
  introduction: {} as IntroductionInterface,
  commentsList: [] as CommentInterface[],
  websiteInformation: [] as { title: '', value: 0, }[],
  tags: [] as Tagsinterface[],
  notice: '',
})

// 储存时间
let websiteTime = ref<any>()
let timer: any = null;

onBeforeMount(() => {
  store.dispatch('useAppStore/getAside').then((result: ArticleAsideinterface) => {
    Object.assign(data, result)
    // 深拷贝
    websiteTime.value = JSON.stringify(<number>data.websiteInformation[0].value * 1000)
    executionTimer();
  })
})

//在页面销毁之前先销毁定时器
onUnmounted(() => {
  clearTimeout(timer)
})

const executionTimer = () => {
  timer = setInterval(() => {
    let timeold = new Date().getTime() - <any>new Date(JSON.parse(websiteTime.value))
    let msPerDay = 24 * 60 * 60 * 1000
    let daysold = Math.floor(timeold / msPerDay)
    let str = ''
    let day = new Date()
    str += daysold + '天'
    str += day.getHours() + '时'
    str += day.getMinutes() + '分'
    str += day.getSeconds() + '秒'
    data.websiteInformation[0].value = str
  }, 1000)
}
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .ArticleAside {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    .sidebar {
      width: 95% !important;
    }

    // 最新评论
    .imageFrame {
      overflow: hidden;
      border-radius: 99rem;
      flex-shrink: 0;
      box-shadow: $accent-shadow;
    }

    .comments {
      width: 0;
      font-size: .75rem;
      line-height: 1rem;
      flex: 1 1 0;

      span {
        color: #24c6dc;
        padding-right: .5rem;
      }

      p {
        color: rgba(107, 114, 128, 1);
      }

      .commentContent {
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        color: #fff;
        font-size: .75rem;
        line-height: 1rem;
      }
    }

    // 标签列表
    :deep(.el-tag) {
      border: 0;
      padding: 0;
      border-radius: .25rem;
      @include background_color('background-color');

      &:hover {
        opacity: .5;
      }

      .tag-a {
        color: inherit;
        padding: .35rem .75rem;
        background-color: #000000;
        text-decoration: inherit;
        border-bottom-left-radius: .375rem;
        border-top-left-radius: .375rem;
      }

      .tag-span {
        opacity: .7;
        border-bottom-right-radius: .375rem;
        border-top-right-radius: .375rem;
        padding: .35rem .5rem;
        background-color: #000000;
        @include font_color('text-sub-accent');
      }
    }

    .el-tag-p {
      margin: 1rem 0 0 0;
      cursor: pointer;
    }
  }
}

:deep(.el-skeleton) {
  @include skeleton();
}

//[class^="router-link"]{
//  text-decoration: none;
//}
</style>
