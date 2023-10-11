<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router="router"
      style="height: 100%"
  >
    <el-menu-item disabled class="log">
      Blog
    </el-menu-item>
    <template v-for="(item,keys) in routers.concat(menuList)" :key="keys">
      <template v-if="item">
        <el-menu-item v-if="item.hasOwnProperty('meta')" :index="item.path">
          <span>
            {{ item.meta.title }}
          </span>
        </el-menu-item>
        <template v-for="(children,key) in item.children" :key="key">
          <template v-if="children.hasOwnProperty('meta')">
            <el-menu-item v-if="children.meta.require" :index="children.path">
              <span>
                {{ children.meta.title }}
              </span>
            </el-menu-item>
          </template>
        </template>
        <!--异步组路由部分-->
        <el-sub-menu :index="item.id" v-if="!item.hasOwnProperty('meta')" popper-class="el-sub-popper">
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(children,key) in item.children" :key="key">
            <el-menu-item :index="children.path">{{ children.title }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import router from '@/router'
import store from "@/store";

const activeIndex = ref('/index')
const routers: any = computed(() => router.options.routes)
const menuList: any = computed(() => store.getters.menuList)
</script>

<style scoped lang="scss">
.el-menu {
  margin: 0 5px;
  padding: 0 20px;
  height: 100%;
  width: 100%;
  border-bottom: none;
  background: #00000000 !important;
  --el-menu-base-level-padding: 0px;
  --el-menu-border-color: none;
  --el-menu-hover-bg-color: none;
  --el-menu-item-height: none;
  .el-menu-item {
    margin: 0 5px;
    --el-menu-hover-text-color: rgba(86, 53, 183, 0.75);
  }

  .el-sub-menu {
    --el-bg-color-overlay: none;
  }
}

:global(.el-sub-popper){
  --el-menu-bg-color: #212121 !important;
  --el-menu-hover-bg-color: none !important;
}

.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-sub-menu__title {
  background-color: $background-dark;
  color: $background-light;
}

:global(.el-menu--popup) {
  min-width: 150px!important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #6d15b7;
  color: rgba(76, 106, 222, 0.99) !important;
}

:global(.el-popper.is-light) {
  background: #212121 !important;
  border: 1px solid #212121 !important;
}

@media (min-width: 1024px) {
  .log{
    width: 5%;
    position: relative;
    font-size: xx-large;
    &:hover{
      text-transform: uppercase;
    }
  }
}
span{
  color: white;
  padding: 5% 5%;
  border-radius: 0.25rem;
  font-size: larger;
  font-weight: 800;
  &:hover{
    background: #212121;
    opacity: 0.8;
  }
}
</style>
