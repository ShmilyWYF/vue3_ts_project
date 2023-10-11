<template>
  <el-card class="home-articleList" body-style="padding: 0;height:100%">
    <el-container>
      <el-main>
        <slot name="default"/>
      </el-main>
      <el-aside>
        <slot name="aside"/>
      </el-aside>
    </el-container>
  </el-card>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
@media (max-width: 1024px) {
  .home-articleList {
    height: auto !important;
  }
}
.home-articleList {
  margin: 1% auto;
  height: 250%;
  width: 85%;
  position: relative;
  background: var(--box-color-bg);
  //opacity: 0.9;
  border: #00000000;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  .el-container {
    height: 100%;
    width: 100%;

    @media (min-width: 1024px) {
      .el-main {
        width: 75%;
        height: 100%;
        position: relative;
        --el-main-padding: 20px 0 0 20px;
        padding-right: 2.5%;
      }
      .el-aside {
        width: 22.5%;
        padding: 1%;
        position: relative;
        display: grid !important;
      }
    }

    .el-main {
      --el-main-padding: 0;
    }

    .el-aside {
      display: none;
    }
  }
}
</style>
