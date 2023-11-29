<template>
  <el-breadcrumb v-show="isbread" :separator-icon="arrowIcon" separator="/">
    <template v-for="(item,key) in breadList" :key="key">
      <el-breadcrumb-item :style="{'pointer-events': item.meta.noRedirect?'none':'auto'}" :to="item.path">
        <span class="breadcrumb-item-a">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import {computed, defineComponent, ref} from "vue";
import {ArrowRight} from '@element-plus/icons-vue'
import {useRoute} from "vue-router";

const router = useRoute()
const arrowIcon = <ReturnType<typeof defineComponent>>ArrowRight
const isbread = ref<boolean>(false)

const breadList = <any>computed(() => {
  const matched = router.matched;
  // 排除页面
  const exclude = ['home', 'articles']
  isbread.value = !exclude.includes(String(matched[1].name))
  return matched
})
</script>

<style lang="scss" scoped>
@media (max-width: 1024px) {
  .el-breadcrumb {
    display: none;
  }
}

.el-breadcrumb {
  display: flex;
  flex: .075;
  min-height: 3.5rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
  font-size: large;
  font-weight: 600;
  background: #00000000;
  @include font_color('text-color');
  position: relative;
  z-index: 15;
  .breadcrumb-item-a{
    color: #212121;
    font-weight: 600;
    cursor:pointer;
    &:hover{
      color: #5433ff;
    }
  }
}
</style>
