<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handlerSelect"
            router="router"
            v-for="(item,keys) in routers"
            :key="keys"
            style="height: 100%"
    >
        <template v-for="(keys) in item.children">
            <template v-if="keys.hasOwnProperty('meta')">
                <el-menu-item :index="keys.meta.index">
                    <el-text tag="p">{{keys.meta.name}}</el-text>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts">
  import { ref } from 'vue'
  import router from '@/router'

  export default {
    name: 'NavMenu',
    setup () {
      return {
        activeIndex: ref('/index'),
        routers: ref(router.options.routes)
      }
    },
    methods: {
      handlerSelect (key: string, keyPath: string[]) {
        console.log(key, keyPath)
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
    .el-menu {
        margin: 0 5px;
        padding: 0 20px;
        border-bottom: none;
        --el-menu-base-level-padding: 0px;

        .el-menu-item {
            margin: 0 5px;
            --el-menu-hover-text-color: #FFFFFF00;
            --el-menu-hover-bg-color: #FFFFFF00;
        }
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid #6d15b7;
        color: #3800ff !important;
    }
</style>

