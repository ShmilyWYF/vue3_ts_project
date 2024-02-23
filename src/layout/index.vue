<template>
  <div :class="isVertical?'verticalClass':'horizontalClass'" class="common-layout">
    <el-container :direction="isVertical?'horizontal':'vertical'">
      <el-header class="el-header" :style="{'--height':height?'100vh':'10vh'}">
        <el-card body-style="background:#00000000;">
          <div class="nav">
            <span>
              <el-link type="info" href="/">Star(￣o￣) . z Z</el-link>
            </span>
            <nav-menu :mode="!isVertical?'horizontal':'vertical'" style=""/>
          </div>
          <span class="tag" v-if="!isVertical">{{ blogName }}</span>
          <svg-icon name="arrows" class="arrow" v-if="!isVertical" @click="mainRef.$el.scrollIntoView();"/>
        </el-card>
      </el-header>
      <el-main id="layoutMain" ref="mainRef" class="el-main">
        <el-card body-style="height:100%">
          <Main :container-main="mainRef" :is-vertical="isVertical"/>
        </el-card>
      </el-main>
      <el-footer class="el-footer">
        <footer-tag/>
      </el-footer>
      <Tool/>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {FooterTag, Main, NavMenu} from "@/layout/component";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import store from "@/store";
import {SvgIcon} from "@/components";
import {Tool} from '@/components'
const mainRef = ref()
const props = defineProps(['isVertical'])
const height = computed(() => useRouter().currentRoute.value.path === '/home')
const blogName = ref<string>(store.getters.useState.websiteConfig.englishName)

</script>

<style lang="scss" scoped>
@import "@/style/arrows";

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

  .el-container {
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

        :deep(.el-menu--inline) {
          background-color: transparent !important;
          display: flex;
          flex-direction: column;
          align-items: center;
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

        .main {
          height: 100%;
        }
      }
    }

    .el-footer {
      display: none;
    }
  }
}
@include arrows();
.horizontalClass {
  $PADDING-LEFT-AND-RIGHT: 2.5%;

  .el-header {
    //height: calc(10vh - 1%);
    height: var(--height);
    width: 100%;
    //padding: 1rem $PADDING-LEFT-AND-RIGHT;
    padding: 0;
    //opacity: 0.5;
    position: relative;
    overflow: hidden;
    opacity: 0.7;
    z-index: 15;
    background: url('/src/assets/index_bunner.jpg') no-repeat fixed;
    background-size: cover;

    &:after {
      pointer-events: none;
      content: '';
      position: absolute;
      z-index: 35;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      @include background_color('article-cover-cred');
    }

    .el-card.is-always-shadow {
      box-shadow: var(--box-card-shadow-header);
    }

    .el-card {
      //padding: 10px;
      background: #00000000;
      border-color: #00000000;
      opacity: 0.9;
      --el-card-border-radius: 12px;
      //height: calc(100% - 40px);
      //width: 90%;
      width: 100%;
      //float: right;
      position: relative;
      z-index: 40;

      :deep(.el-card__body) {
        height: calc(100vh - 40px) !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 3rem;

        .nav {
          display: flex;
          align-items: center;
          width: 100%;

          span {
            flex: 1;

            .el-link {
              font-weight: 800;
              color: aqua;
            }
          }

          .nav-menu {
            flex: 1;
            justify-content: flex-end;
          }

        }

        .tag {
          flex: 1;
          display: flex;
          align-items: center;
          font-weight: 800;
        }

        @include arrows();
        .arrow {
          animation: arrows 1.5s infinite;
        }
      }
    }
  }

  .el-main {
    width: 100%;
    padding: 0 $PADDING-LEFT-AND-RIGHT;
    min-height: calc(100vh - 20vh);
    position: relative;
    z-index: 15;
    overflow: initial;
    top: 3.5rem;

    &:after {
      pointer-events: none;
      content: "";
      position: absolute;
      z-index: 5;
      left: 0;
      top: -3.5rem;
      height: 2.5%;
      width: 100%;
      @include background_color('article-cover-cred-reverse');
    }


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
