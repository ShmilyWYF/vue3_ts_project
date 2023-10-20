<template>
  <div class="ArticleAside">
    <Introduction style="height: 26.5rem;" :data="introductionData"/>
    <Sidebar title="最新评论" icon="moon" :data="commentsListData" h="auto">
      <template #content="slotProps">
        <div class="imageFrame">
          <el-avatar :size="40" :src="slotProps.item.avatar" />
        </div>
        <div class="comments">
          <span>{{ slotProps.item.nickname }}</span>
          <p style="overflow: hidden;text-overflow: ellipsis;">{{ slotProps.item.date }}</p>
          <div class="commentContent">{{ slotProps.item.Content }}</div>
        </div>
      </template>
    </Sidebar>
    <Sidebar title="标签目录" icon="moon" ul-display="flex" h="auto" :data="tagsData"  :ul-li-clss="{padding: '0',margin: '0'}">
      <template #content="slotProps">
        <el-tag :type="slotProps.item.type" effect="dark">
          <template #default>
            <a :href="slotProps.item.url" class="tag-a">{{slotProps.item.label}}</a>
            <span class="tag-span">10</span>
          </template>
        </el-tag>
      </template>
      <template #defulet>
        <p>查看更多</p>
      </template>
    </Sidebar>
    <Sidebar title="公告" icon="moon" ul-display="flex" h="auto">
      <template #content>
        <!--        {{announcement}}-->
        博客项目已完成，代码已开源，开源地址在上方的github地址,仿auroraUI设计,封装大量复用UI组件，axios-mock-store工厂模式
      </template>
    </Sidebar>
    <Sidebar title="网站信息" icon="moon" h="auto" :data="WebsiteInformationData" :ul-li-clss="{'justify-content':'space-between'}">
      <template #content="slotProps">
        <span>
         {{slotProps.item.title}}
        </span>
        <span>
         {{slotProps.item.value}}
        </span>
      </template>
    </Sidebar>
  </div>
</template>
<script setup lang="ts">

import {Introduction, Sidebar} from "@/components";
import {ref} from "vue";
import store from "@/store";

const commentsListData =  ref<any>([])
const WebsiteInformationData =  ref<any>([])
const tagsData = ref<any>([])
const introductionData = ref<any>([])

store.dispatch('articleStore/getAllArticleAsideList').then((res:any)=>{
  commentsListData.value = res.commentsList.slice(0,7)
  WebsiteInformationData.value = res.WebsiteInformation
  tagsData.value = res.tags.slice(0,10)
  introductionData.value = res.introduction
})

</script>

<style scoped lang="scss">
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
    .sidebar{
      width: 95% !important;
    }
    // 最新评论
    .imageFrame {
      overflow: hidden;
      border-radius: 99rem;
      flex-shrink: 0;
      box-shadow: $accent-shadow;
      :deep(.el-avatar)>img {
        transition-property: transform;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        transition-duration: .8s;
        transform: rotate(-1turn);
        max-width: 100%;
        height: auto;
        display: block;
        vertical-align: middle;
        &:hover{
          transform: rotate(1turn);
        }
      }
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
        margin: 0;
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
    :deep(.el-tag){
      border: 0;
      padding: 0;
      border-radius: .25rem;
      @include background_color('background-color');
      &:hover{
        opacity: .5;
      }
      .tag-a{
        color: inherit;
        padding: .35rem .75rem;
        background-color: #000000;
        text-decoration: inherit;
        border-bottom-left-radius: .375rem;
        border-top-left-radius: .375rem;
      }
      .tag-span{
        opacity: .7;
        border-bottom-right-radius: .375rem;
        border-top-right-radius: .375rem;
        padding: .35rem .5rem;
        background-color: #000000;
        @include font_color('text-sub-accent');
      }
    }
  }
}


</style>
