<template>
  <div class="home">
    <div class="option-top">
      <el-card>
        文章量
      </el-card>
      <el-card>
        标签数
      </el-card>
      <el-card>
        文章草稿
      </el-card>
      <el-card>
        待审核评论
      </el-card>
    </div>
    <div class="option-center">
      <el-card class="statistics-box">
        <HistogramDailyFlow/>
      </el-card>
      <el-card>
        1/4
      </el-card>
      <el-card>
        1/4
      </el-card>
    </div>
    <div class="option-bottom">

    </div>
  </div>
</template>

<script lang="ts" setup>
import {HistogramDailyFlow} from "@/components/Echarts/index";
</script>

<style scoped lang="scss">
.home {
  flex: 1;
  display: flex;
  padding: 1rem;
  height: 0 !important;
  gap: 1rem;

  .option-top {
    flex: .2;
    display: flex;
    flex-direction: row;
    gap: .75rem;

    .el-card {
      flex: 1;
    }
  }

  .option-center {
    flex: .4;
    display: flex;
    gap: 1rem;
    flex-direction: row;

    .statistics-box {
      flex: .5 !important;
      display: flex;
      position: relative;
    }

    :deep(.el-card) {
      flex: .25;
      background: #ffffff !important;
      border-radius: .75rem;
      box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px !important;

      .el-card__body {
        display: flex;
        flex: 1;
      }

    }
  }

  .option-bottom {
    flex: .4;
    display: flex;
    flex-direction: row;
  }
}
</style>
