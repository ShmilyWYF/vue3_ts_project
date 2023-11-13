<template>
  <div class="main" ref="mainRef">
    <Breadcrumb/>
    <router-view class="view" v-if="isRouterAlive"/>
    <el-backtop v-if="!isVertical" :right="200" :bottom="100"/>
    <Drawer @switch-theme="switchTheme" @is-Switch-Bg="isSwitchBgEvent" :is-switch-bg-button="isSwitch" :container="containerMain"/>
    <App-Banner :style="isVertical?{height: '55%'}:''"/>
  </div>
  <!--背景板-->
  <transition name="fade">
    <div class="main-bg" v-show="isSwitch"/>
  </transition>
</template>

<script lang="ts" setup>
import {AppBanner, Breadcrumb} from "@/components";
import {Drawer} from "@/layout/component";
import store from "@/store";
import {nextTick, provide, readonly, ref, toRefs} from "vue";

const props = defineProps(['containerMain', 'isVertical'])
const {containerMain} = toRefs(props)
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

// 切换主题事件
const switchTheme = (args: boolean) => {
  const theme = {'theme': args ? 'light' : 'dark'}
  document.documentElement.setAttribute("data-theme", theme.theme);
  store.dispatch('useAppStore/themeConfig', theme);
}

// 组件boolean同步
const isSwitch = ref<boolean|null>(JSON.parse(String(localStorage.getItem('IsSwitchBg'))) || false)
const isSwitchBgEvent = (event: boolean) => {
  isSwitch.value = event
}

</script>

<style scoped lang="scss">
.main {
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: inherit;
  z-index: 10;
  display: flex;
  flex-direction: column;

  .el-breadcrumb {
    flex: 1;
  }

  .view {
    height: inherit;
    //width: 100%;
    position: relative;
    z-index: 15;
    display: flex;
    flex-direction: column;
  }
}


@media (min-width: 1024px) {
  .el-backtop {
    right: 2% !important;
    bottom: 1% !important;
    z-index: 30;
    position: fixed;
  }
}


.main-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1px;
  z-index: 1;
  border-radius: 1rem;
  @include background_color('background-color')
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.5s;
}

.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.25);
  }
  50% {
    transform: scale(0.5);
  }
  75% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}

</style>
