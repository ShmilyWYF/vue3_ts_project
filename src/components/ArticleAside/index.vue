<template>
  <div class="ArticleAside">
    <Introduction style="height: 26.5rem"/>
    <Sidebar title="最新评论" icon="moon" style="height: 25%">
      <template #default>
            <div class="imageFrame">
              <img src="https://static.linhaojun.top/aurora/config/0af1901da1e64dfb99bb61db21e716c4.jpeg" alt="头像"/>
            </div>
            <div class="comments">
              <span>用户</span>
              <p>2023-10-9</p>
              <div class="commentContent">不错啊</div>
            </div>
      </template>
    </Sidebar>
    <Sidebar title="最新评论" icon="moon" style="height: 20%">
      <template #default>
        123
      </template>
    </Sidebar>
  </div>
</template>
<script setup lang="ts">
import {Introduction, Sidebar} from "@/components";
</script>
<style scoped lang="scss">
@media (min-width: 1024px) {
  .ArticleAside {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}

.el-aside {
  display: none;
}


</style>
