<template>
  <el-affix :offset="topDistance">
    <Sidebar :default-class="false" h="auto" icon="moon" title="文章目录">
      <template #defulet="slotProps">
        <div id="toc" class="js-toc-content"/>
        <SidebarNavigator  :jump-to-component="toRef" v-show="slotProps.afterRender"/>
      </template>
    </Sidebar>
  </el-affix>
</template>
<script lang="ts" setup>
import {Sidebar, SidebarNavigator} from "@/components";

defineProps({
  topDistance: {
    type: Number,
    default: 50,
  },
  toRef:{
    required: true,
  }
})
</script>

<style lang="scss">
@import 'tocbot/src/scss/tocbot';
@import url('https://fonts.font.im/css?family=Roboto');

.el-affix {
  width: auto !important;
  height: auto !important;
}

#toc > ol {
  padding: 1rem;
}

#toc {

  height: 25rem;
  overflow: auto;

  .toc-list {
    @include background_color('background-primary');
    border-radius: .75rem;
    line-height: 1.75rem;

    .toc-list-item {
      @include font_color('text-color-primary');

      .toc-link {
        text-decoration: none;

        &::before {
          background: none;
        }
      }
    }

    .is-active-li {
      .is-active-link {
        color: #5433ff;
        text-decoration: none;
      }
    }
  }
}

</style>
