<template>
    <el-breadcrumb separator="/" :separator-icon="arrowIcon" v-show="isbread">
      <template  v-for="(item,key) in breadList" :key="key">
        <el-breadcrumb-item :to="item.path" :style="{'pointer-events': item.meta.noRedirect?'none':'auto'}">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import {computed, defineComponent, ref} from "vue";
import {ArrowRight} from '@element-plus/icons-vue'
import {useRoute} from "vue-router";

const arrowIcon = <ReturnType<typeof defineComponent>>ArrowRight
const isbread = ref<boolean>(false)

const breadList = <any>computed(()=>{
  let matcheds = useRoute().matched;
  // 排除页面
  const exclude = ['home','articles']
  isbread.value = !exclude.includes(String(matcheds[1].name))
  return matcheds
})
</script>

<style lang="scss" scoped>
@media (max-width: 1024px) {
  .el-breadcrumb{
    display: none;
  }
}
.el-breadcrumb{
  width: 85%;
  padding: 1%;
  background: #00000000;
  @include font_color('text-color');
  position: relative;
  z-index: 15
}
</style>
