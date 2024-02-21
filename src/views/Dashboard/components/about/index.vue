<template>
  <div class="about-box">
    <Mark :content="aboutContent" @save-cache="updateAbout" :edit-mode="true" :is-exit-btn="false"/>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {Mark} from "@/components";
import {ElNotification} from "element-plus";

const aboutContent = ref<string>('')

onBeforeMount(()=>{
  getAbout()
})

const getAbout = () => {
  api.aboutApi.getAbout().then(({data}:AxiosResponse) => {
    aboutContent.value = data.data
  })
}

const updateAbout = () => {
  api.aboutApi.updateAbout().then(({data}:AxiosResponse) => {
    ElNotification({
      type: data.type,
      message: data.message,
      title: '通知'
    })
  })
}
</script>

<style scoped lang="scss">
.about-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;
}
</style>
