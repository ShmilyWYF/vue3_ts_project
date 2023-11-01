<template>
  <div class="main" ref="mainRef">
    <Breadcrumb/>

    <el-row :gutter="0" justify="center">
      <el-col :xs="{span: 24}" :md="{span: 22}" :lg="{span: 20}">
        <router-view class="view"/>
      </el-col>
    </el-row>

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
import {ref} from "vue";

defineProps(['containerMain','isVertical'])

// 切换主题事件
const switchTheme = (args: boolean) => {
  const theme = {'theme': args ? 'light' : 'dark'}
  document.documentElement.setAttribute("data-theme", theme.theme);
  store.dispatch('useAppStore/themeConfig', theme);
}

// 组件boolean同步
const isSwitch = ref<any>(JSON.parse(String(localStorage.getItem('IsSwitchBg'))) || false)
const isSwitchBgEvent = (event: boolean) => {
  isSwitch.value = event
}

</script>

<style scoped lang="scss">
.main{
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: inherit;
  z-index: 10;
}

.el-row{
  align-items: center;
  .el-col{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .view{
      height: auto;
      width: 100%;
      position: relative;
      z-index: 15;
      display: flex;
      flex-direction: column;
    }
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


.main-bg{
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
