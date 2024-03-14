<template>
  <div class="about">
    <span>
      About
    </span>
    <el-skeleton animated :loading="content&&content.length === 0">
      <template #template>
        <el-card>
          <el-skeleton :rows="15"/>
        </el-card>
      </template>
      <template #default>
        <Mark ref="markRef" v-model="content"/>
      </template>
    </el-skeleton>
    <br/>
    <Comment :type="3"/>
  </div>
</template>

<script setup lang="ts">
import {Comment, Mark} from "@/components";
import {onBeforeMount, ref} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";

const content = ref<string>('')
onBeforeMount(() => {
  api.aboutApi.getAbout().then(((res: AxiosResponse) => {
    const {data} = res.data
    content.value = data
  }))
})
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 3rem 3rem;

  > span:nth-child(1) {
    font-size: xxx-large;
    font-weight: 800;
    padding: 1rem .5rem;
  }

  .el-card {
    height: 100%;
    width: 100%;
    min-height: 5rem;
    border-radius: 1rem;
    word-wrap: break-word;
    word-break: break-all;
    border: none;
    @include background_color('background-color');
    @include box_shadow('box-card-shadow-sidebar-card');
  }

}

.el-skeleton {
  @include skeleton();
}
</style>
