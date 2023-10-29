<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <el-card body-style="height: 100%;background:#00000000;">
          <nav-menu/>
        </el-card>
      </el-header>
      <el-main class="el-main" ref="mainRef">
        <el-card body-style="height:100%">
          <Main :container-main="mainRef"/>
        </el-card>
      </el-main>
      <el-footer class="el-footer">
        <footer-tag/>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {NavMenu, Main, FooterTag} from "@/layout/component";
import {ref} from "vue";
const mainRef = ref()
</script>

<style scoped lang="scss">
.common-layout {
  background: var(--body-Background);
}

.common-layout, .common-layout * {
  --box-card-shadow-light: rgb(38, 57, 77) 0px 20px 30px -10px;
  --box-card-shadow-header: rgb(38, 57, 77) 0px -30px 30px -10px;
  $PADDING-LEFT-AND-RIGHT: 2.5%;

  .el-container {
    align-items: center;

    .el-header {
      height: calc(10vh - 1%);
      width: 100%;
      padding: 1rem $PADDING-LEFT-AND-RIGHT;
      opacity: 0.5;
      position: relative;
      z-index: 15;

      .el-card.is-always-shadow {
        box-shadow: var(--box-card-shadow-header);
      }

      .el-card {
        padding: 10px;
        background: #00000000;
        border-color: #00000000;
        opacity: 0.9;
        --el-card-border-radius: 12px;
        height: 100%;
      }
    }

    .el-main {
      width: 100%;
      padding: 0 $PADDING-LEFT-AND-RIGHT;
      min-height: calc(100vh - 20vh);
      position: relative;
      z-index: 10;
      overflow: initial;

      .el-affix {
        height: 1%;
        position: absolute;
        z-index: 999;
        display: block;
        right: 1rem;
      }

      .el-card {
        //height: 100vh;
        border: 0;
        background: #00000000;
        position: relative;
        overflow: inherit;
      }
    }

    .el-footer {
      height: 10vh;
      padding: 0 $PADDING-LEFT-AND-RIGHT;
      width: 100%;

      .el-card {
        --el-card-padding: 0px;
      }
    }
  }
}

.el-card {
  --el-card-padding: 0;
  --el-card-border-radius: 12px;
}

.el-card.is-always-shadow {
  box-shadow: var(--box-card-shadow-light);
}
</style>
