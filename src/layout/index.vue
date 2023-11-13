<template>
  <div class="common-layout" :class="isVertical?'verticalClass':'horizontalClass'">
    <el-container :direction="isVertical?'horizontal':'vertical'">
      <el-header class="el-header">
        <el-card body-style="height: 100%;background:#00000000;">
          <nav-menu :mode="!isVertical?'horizontal':'vertical'"/>
        </el-card>
      </el-header>
      <el-main class="el-main" ref="mainRef" id="layoutMain">
        <el-card body-style="height:100%">
          <Main :container-main="mainRef" :is-vertical="isVertical"/>
        </el-card>
      </el-main>
      <el-footer class="el-footer">
        <footer-tag/>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {FooterTag, Main, NavMenu} from "@/layout/component";
import {ref} from "vue";

const mainRef = ref()
const props = defineProps(['isVertical'])
</script>

<style scoped lang="scss">
.common-layout {
  background: var(--body-Background);
}

.common-layout, .common-layout * {
  --box-card-shadow-light: rgb(38, 57, 77) 0px 20px 30px -10px;
  --box-card-shadow-header: rgb(38, 57, 77) 0px -30px 30px -10px;

  .el-container {
    align-items: center;
  }
}


.verticalClass {
  height: 100%;
  .el-container{
    height: inherit;
    gap: 2rem;
    .el-header {
      height: 100%;
      display: flex;
      padding: 1rem 0 1rem 3rem;
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
        height: calc(100% - 40px);

        :deep(.el-menu--inline){
          background-color: transparent !important;
        }
      }
    }
    .el-main {
      height: 100%;
      position: relative;
      z-index: 10;
      overflow: auto;
      padding: 1rem 3rem 1rem 0;
      flex: 1;
      :deep(.el-card) {
        height: 100%;
        border: 0;
        background: #00000000;
        position: relative;
        overflow: inherit;
        .main{
          height: 100%;
        }
      }
    }
    .el-footer {
      display: none;
    }
  }
}

.horizontalClass {
  $PADDING-LEFT-AND-RIGHT: 2.5%;
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
      height: calc(100% - 40px);
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

.el-card {
  --el-card-padding: 0;
  --el-card-border-radius: 12px;
}

.el-card.is-always-shadow {
  box-shadow: var(--box-card-shadow-light);
}
</style>
