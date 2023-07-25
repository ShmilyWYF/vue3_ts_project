<template>
  <div class="index-main">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
.index-main {
  height: 100%;
  .el-row {
    margin-left: 0!important;
    margin-right: 0!important;
    height: 50%;
    padding: 10px;
    .el-card{
      height:100%;
    }
  }
}
</style>
