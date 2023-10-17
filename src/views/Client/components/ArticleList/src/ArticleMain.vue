<template>
  <el-row :gutter="0" style="width: 100%;" justify="center">
    <el-col :xs="{span: 24}" :md="{span: 22}" :lg="{span: 20}">
      <el-card class="home-articleList" body-style="padding: 0;height:100%">
        <el-header>
          <slot name="header"/>
        </el-header>
        <el-container>
          <el-row :gutter="32" style="width: 100%;">
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 16}" :lg="{span: 18}">
              <el-main>
                <slot name="default"/>
              </el-main>
            </el-col>
            <el-col class="hidden-sm-and-down" :md="{span: 8}" :lg="{span: 6}">
              <el-aside>
                <slot name="aside"/>
              </el-aside>
            </el-col>
          </el-row>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.home-articleList {
  height: 100%;
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
  @include background_color('background-color');
  opacity: 0.9;
  border: #00000000;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  @media (min-width: 1024px) {
    .el-main {
      --el-main-padding: 0;
    }
    .el-aside {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
