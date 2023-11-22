<template>
  <Loading/>
  <router-view/>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading/index.vue";
</script>
<style lang="scss">
@import "@/style/sk.css";

html, body, #app {
  width: 100%;
  padding: 0;
  margin: 0;
  min-width: 390px;
  min-height: 768px;
  font-size: 1rem;
}

body {
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: Poppins, Rubik, Avenir, Helvetica, Arial, sans-serif, serif;

  :deep(.el-card__body) {
    height: 100%;
  }
}

body {
  background: var(--body-Background);
}

#app {
  @include setApp(130deg, 240deg);
  font-size: 100%;
}

.el-avatar > img {
  transition-property: transform;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .8s;
  transform: rotate(-1turn);
  max-width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;

  &:hover {
    transform: rotate(1turn);
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

*::-webkit-scrollbar {
  width: 0.25rem;
  background: $webkit-scrollbar-bg
}

*::-webkit-scrollbar-thumb {
  background: #ccc; // 滑块颜色
  opacity: 0.8;
  border-radius: 5px; // 滑块圆角
}

* {
  //scrollbar-width: 10;
  scrollbar-base-color: green;
  scrollbar-track-color: red;
  scrollbar-arrow-color: blue;
}


</style>

