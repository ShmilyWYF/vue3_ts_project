<template>
  <div class="main">
    <Breadcrumb/>
    <router-view class="view"/>
    <App-Banner/>
  </div>
  <!--背景板-->
  <transition name="fade">
    <div class="main-bg" v-show="isShowBg"/>
  </transition>
</template>

<script lang="ts" setup>
import {Breadcrumb,AppBanner} from "@/components";

defineProps({
  isShowBg:{
    type: Boolean,
    required: true,
    default: false,
  }
})

</script>

<style scoped lang="scss">
.main{
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: auto;
  z-index: 10;
  .view{
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 15
  }
}


.main-bg{
  width: 99.7%;
  height: 100%;
  position: absolute;
  top: 1px;
  z-index: 1;
  border-top-left-radius: 12px;
  border-top-right-radius: 5px;
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
