<template>
  <div class="tag-list">
    <span>
      {{ title }}
    </span>
    <div class="tag-list-box"  v-if="isShowTagList">
      <el-tag effect="dark" type="info" size="large" v-for="item in tagList" :key="item.id">
        <template #default>
          <router-link class="tag-a" :to="'/tags?tagName='+item.tagName" @click="isShowTagList = false">{{ item.tagName }}</router-link>
          <span class="tag-span">{{ item.articleCount }}</span>
        </template>
      </el-tag>
      <span style="font-weight: 800;font-size: xx-large">#</span>
    </div>
    <div v-else class="tag-list-article-box">
      <Article v-for="(item,key) in data" :key="key" :data="item" type="1" h="25rem"/>
    </div>
<!--        <Comments :comment-data="''" comments-call="" index-call="" is-have-more/>-->
  </div>
</template>

<script setup lang="ts">
import api from "@/axios";
import {AxiosResponse} from "axios";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {Article, Comments} from "@/components";
import {start,close} from "@/utils/nporgress";
import {ElMessage} from "element-plus";

const router = useRoute()
const tagList = ref<[{ id:number, tagName:string, articleCount:number, }]>([
    {
      id: 0,
      tagName:'',
      articleCount:0
    }
])
const isShowTagList = ref<boolean>(true)
const data = ref<[]>()

const title = ref<string>('Tags')

onMounted(async ()=>{
  await getData()
})

watch(()=><any>router.query,async () => {
  await getData()
})

const getData = async (value?:string) =>{
  if (!router.query.hasOwnProperty('tagName')){
    title.value = 'Tags'
    await api.tagsApi.getTagsWithCount().then((res:AxiosResponse)=>{
      const tagData = res.data
      tagList.value = tagData.data;
    })
    isShowTagList.value = true
  }else {
    title.value = tagNameParsing(String(router.query.tagName))
    await redirectLabel(title.value)
  }
}

const redirectLabel = async (tagName:string) =>{
  start()
  try {
    await api.articleApi.getArticleListByTags(tagName).then((res:AxiosResponse)=>{
      const articleList = res.data
      data.value = articleList.data
    },(e:any)=>{
      throw new Error('获取'+title.value+'标签文章出错!'+e)
    })
    ElMessage.success(title.value+'：'+data.value?.length+'条')
  }catch (e:string|any) {
    ElMessage.error(e)
  }finally {
    close()
    isShowTagList.value = false;
  }
}

const tagNameParsing = (value:string)=>{
  let tagName:string|[]|any = <string>value
  if (value.indexOf(" ") != -1) {
    tagName = []
    let arr:string[] = value.split('')
    while (arr.length !== 0){
      let shift:string = <string|any>arr.shift()
      shift.indexOf(" ") != -1?tagName.push('+'):tagName.push(shift)
    }
    tagName = tagName.join('')
  }
  return tagName
}
</script>

<style lang="scss" scoped>
.tag-list{
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 3rem 3rem;

  > span:nth-child(1){
    font-size: xxx-large;
    font-weight: 800;
    padding: 1rem .5rem;
  }

  .tag-list-box{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    height: auto;
    padding: 5rem;
    border-radius: .75rem;
    @include background_color('background-color');
    .el-tag{
      padding: 0;
      border: none;
      font-size: large;
      font-weight: 600;
      background: inherit;
      &:hover{
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

  .tag-list-article-box{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    flex: 1;
    .Article{
      flex-basis: 100%;
    }
    @media screen and (min-width: 1200px) {
      .Article{
        flex-basis: 49%;
      }
    }
    @media screen and (min-width: 1600px) {
      .Article{
        flex-basis: 32%;
      }
    }
    @media screen and (min-width: 1800px) {
      .Article{
        flex-basis: 24.25%;
      }
    }
  }

}

</style>
