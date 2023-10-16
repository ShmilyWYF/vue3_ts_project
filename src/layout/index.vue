<template>
  <div class="common-layout">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-container>
          <el-header class="el-header">
            <el-card body-style="height: 100%;background:#00000000;">
              <nav-menu/>
            </el-card>
          </el-header>
          <el-main class="el-main">
            <el-card body-style="height:100%">
                <Main :is-show-bg="isSwitch"/>
            </el-card>
          </el-main>
          <el-footer class="el-footer">
              <footer-tag/>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
    <Drawer @switch-theme="switchTheme" @is-Switch-Bg="isSwitchBgEvent" :is-switch-bg-button="isSwitch"/>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {NavMenu,Main,FooterTag,Drawer} from "@/layout/component";
import store from "@/store";

const switchTheme = (args:boolean) => {
  const theme = {'theme': args?'light':'dark' }
  window.document.documentElement.setAttribute( "data-theme", theme.theme);
  store.dispatch('useAppStore/themeConfig',theme);
}

// 组件boolean同步
const isSwitch = ref(JSON.parse(String(localStorage.getItem('IsSwitchBg')))||false)
const isSwitchBgEvent = (event:boolean) =>{
  isSwitch.value = event
}

</script>

<style scoped lang="scss">
.common-layout, .common-layout * {
  height: 100%;
  --box-card-shadow-light: rgb(38, 57, 77) 0px 20px 30px -10px;
  --box-card-shadow-header: rgb(38, 57, 77) 0px -30px 30px -10px;

  .el-card {
    --el-card-height: 95%;
    --el-card-padding: 0;
    --el-card-border-radius: 12px;
  }

  .el-row {
    margin: 0 !important;

    .el-header {
      margin: 1%;
      --el-header-height: 5%;
      height: var(--el-header-height);
      opacity: 0.5;
      position: relative;
      z-index: 10;

      .el-card.is-always-shadow {
        box-shadow: var(--box-card-shadow-header);
      }

      .el-card {
        background: #00000000;
        border-color: #00000000;
        opacity: 0.9;
        --el-card-border-radius: 12px;
        height: var(--el-card-height);
      }
    }

    .el-main {
      height: 100%;
      margin: 0 1%;
      --el-header-height: 90% !important;
      padding: 0 20px;
      position: relative;
      z-index: 10;
      .el-affix {
        height: 1%;
        position: absolute;
        z-index: 999;
        display: block;
        right: 1rem;
      }

      .el-card {
        border: 0;
        background: #00000000;
        position: relative;
        overflow: hidden;
      }
    }
  }

  .el-footer {
    margin: 1%;
    --el-footer-height: 3%;
    height: var(--el-footer-height);

    .el-card {
      --el-card-padding: 0px;
    }
  }
}
.el-card.is-always-shadow {
  box-shadow: var(--box-card-shadow-light);
}
</style>
