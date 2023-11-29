<template>
  <el-menu
      :class="[mode==='horizontal'?'menu-horizontal':'menu-vertical']"
      :default-active="activeIndex"
      :mode="mode"
      router="router"
      style="height: 100%"
  >
    <el-menu-item class="log" disabled>
      Blog
    </el-menu-item>
    <template v-for="(item,keys) in routers" :key="keys">
      <template v-for="(children,key) in item.children" :key="key">
        <el-menu-item v-if="children.meta.require" :index="children.path">
              <span>
                {{ children.meta.title }}
              </span>
        </el-menu-item>
        <el-sub-menu v-else-if="children?.children" :index="key+'1'" popper-class="el-sub-popper">
          <template #title>
            <span>{{ children.meta.title }}</span>
          </template>
          <template v-for="(childrenItem,key) in children?.children" :key="key">
            <el-menu-item v-if="!childrenItem.meta.hide" :index="childrenItem.path">{{
                childrenItem.meta.title
              }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>

    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {computed, ref, toRefs} from 'vue'
import store from "@/store";
import {useRoute} from "vue-router";
// defineEmits(['mode'])
const props = defineProps({
  mode: {
    type: String,
    default: 'horizontal',
  }
})
const {mode} = toRefs(props)
console.log("当前模式", mode?.value)

const activeIndex = ref('/home')
// 公共路由部分
const routers: any = computed(() => {
  return [useRoute().matched[0]]
})
// 私有路由部分
const accessedRouters: any = computed(() => store.getters.accessedRouters)

</script>

<style lang="scss" scoped>
.el-menu {
  background: #00000000 !important;
  --el-menu-base-level-padding: 0px;
  --el-menu-border-color: none;
  --el-menu-hover-bg-color: none;
  --el-menu-item-height: none;
  margin: 0 5px;
  border-bottom: none;

  .el-menu-item {
    height: 2rem;
    color: white;
    font-weight: 600;
    --el-menu-hover-text-color: rgba(86, 53, 183, 0.75);
  }

  :deep(.el-sub-menu) {
    --el-bg-color-overlay: none;
    // sub标题
    .el-sub-menu__title {
      height: auto;
    }

    .el-menu-item {
      width: min-content;
      height: 1.25rem;
      padding: 5% !important;
      margin: .25rem 0;
      border-radius: .25rem;
      float: right;

      &:hover {
        background-color: #212121;
        opacity: .8;
      }
    }
  }
}

.menu-horizontal {

}

.menu-vertical {
}


//.el-menu--horizontal .el-menu .el-menu-item{
//  @include background_color('background-color');
//  @include font_color('text-color-primary')
//}

.el-menu--horizontal > .el-menu-item .is-active {
  border-bottom: 2px solid #6d15b7 !important;
  color: rgba(76, 106, 222, 0.99) !important;
}

@media (min-width: 1024px) {
  .log {
    width: 5%;
    position: relative;
    font-size: xx-large;

    &:hover {
      text-transform: uppercase;
    }
  }
}

span {
  color: white;
  padding: 5% 5%;
  border-radius: 0.25rem;
  font-size: larger;
  font-weight: 800;

  &:hover {
    background: #212121;
    opacity: 0.8;
  }
}
</style>

