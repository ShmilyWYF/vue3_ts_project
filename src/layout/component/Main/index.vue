<template>
  <div ref="mainRef" class="main">
    <Breadcrumb/>
    <router-view v-if="isRouterAlive" class="view"/>
    <App-Banner :style="isVertical?{height: '55%'}:''"/>
  </div>
  <!--背景板-->
  <div id="mainbg" class="main-bg"/>
</template>

<script lang="ts" setup>
import {AppBanner, Breadcrumb} from "@/components";
import {nextTick, provide, readonly, ref} from "vue";

const props = defineProps(['isVertical'])
const isRouterAlive = ref<boolean>(true)

// 视图重载
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  })
}

// 设置只读，子组件不能做修改
provide('reload', readonly(reload))
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: inherit;
  z-index: 10;
  display: flex;
  flex-direction: column;

  .view {
    height: inherit;
    //width: 100%;
    position: relative;
    z-index: 15;
    display: flex;
    flex-direction: column;
  }
}

.main-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1px;
  z-index: 1;
  border-radius: 1rem;
  display: none;
  @include background_color('background-color')
}
</style>
