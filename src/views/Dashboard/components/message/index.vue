<template>
  <div class="message-box">
    <Mark v-model="messageContent" @save-cache="addOrUpdateMessage" :edit-mode="true" :is-exit-btn="false"/>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {Mark} from "@/components";
import {ElNotification} from "element-plus";

const messageContent = ref<string>('')

onBeforeMount(()=>{
  getMessage()
})

const getMessage = () => {
  api.messageApi.getMessage().then((res:AxiosResponse) => {
    const {data} = res.data
    messageContent.value = data
  })
}

const addOrUpdateMessage = (content:string) => {
  let param = {
    content
  }
  api.messageApi.addOrUpdateMessage(param).then(({data}:AxiosResponse) => {
    ElNotification({
      type: data.type,
      message: data.message,
      title: '通知'
    })
  })
}
</script>

<style scoped lang="scss">
.message-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;
}
</style>
