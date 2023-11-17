<template>
  <el-card :style="{background: background+'!important'}" body-style="padding: 0;height:100%"
           class="home-articleList articleMain">
    <el-header :class="headerClass" :style="headerBody">
      <slot name="header"/>
    </el-header>
    <el-container>
      <el-row :gutter="gutter" style="flex: 1 1 0">
        <el-col :lg="{span: 18}" :md="{span: 24}">
          <el-main :class="mainClass" :style="mainBody">
            <slot name="default"/>
          </el-main>
        </el-col>
        <!--后续构想，小于1200隐藏改为隐入侧边栏淡入淡出-->
        <el-col :lg="{span: 6}" class="hidden-md-and-down">
          <el-aside :class="asideClass" :style="asideBody">
            <slot name="aside"/>
          </el-aside>
        </el-col>
      </el-row>
    </el-container>
  </el-card>
</template>

<script lang="ts" setup>
defineProps(['headerBody', 'mainBody', 'asideBody', 'headerClass', 'mainClass', 'asideClass', 'background', 'gutter']);
</script>

<style lang="scss" scoped>
.home-articleList {
  min-height: 10rem;
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: 1rem;
  @include background_color('background-color');
  opacity: 0.9;
  border: #00000000;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  z-index: 30;
  @media (min-width: 1024px) {
    .el-main {
      --el-main-padding: 0;
    }
  }

  :deep(.el-aside) {
    width: 100%;
    height: 100%;
    overflow: unset;
  }
}
</style>
