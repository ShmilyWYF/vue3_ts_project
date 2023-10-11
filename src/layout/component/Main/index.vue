<template>
  <div class="main">
    <Breadcrumb/>
    <router-view class="view"/>
    <App-Banner/>
  </div>
  <!--背景板-->
  <div class="main-bg" v-show="isMainBg"/>
</template>


<script lang="ts" setup>
import {Breadcrumb,AppBanner} from "@/components";
import {computed} from "vue";
const isMainBg = computed<boolean>(()=>false)
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

</style>
