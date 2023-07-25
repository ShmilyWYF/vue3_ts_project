<template>
  <div class="common-layout">
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-container>
          <el-header class="el-header">
            <el-card body-style="height: 100%">
              <nav-menu/>
            </el-card>
          </el-header>
          <el-main class="el-main">
            <el-card body-style="height: 100%">
              <Main/>
            </el-card>
          </el-main>
          <el-footer class="el-footer">
            <el-card body-style="height: 100%">
              <footer-tag/>
            </el-card>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NavMenu from '@/layout/component/NavMenu'
import FooterTag from '@/layout/component/FooterTag'
import Main from '@/layout/component/Main'

export default {
  name: 'index',
  components: {
    NavMenu,
    FooterTag,
    Main
  },
  setup () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.common-layout, .common-layout * {
  height: 100%;

  .el-card {
    --el-card-height: 95%;
    --el-card-padding: 0;
    --el-card-border-radius: 12px;
  }
}

.el-row {
  margin: 0 !important;

  .el-header {
    margin: 1%;
    --el-header-height: 5%;
    height: var(--el-header-height);

    .el-card {
      --el-card-border-radius: 12px;
      height: var(--el-card-height);
    }
  }

  .el-main {
    margin: 0 1%;
    --el-header-height: 88% !important;
    height: var(--el-footer-height);
    padding: 0 20px;

    .el-card {
      border: 0;
      background: radial-gradient(#fdfdfd00, #ffffff3d);
    }
  }
}

.el-footer {
  margin: 1%;
  --el-footer-height: 5%;
  height: var(--el-footer-height);

  .el-card {
    --el-card-padding: 0px;
  }
}
</style>
