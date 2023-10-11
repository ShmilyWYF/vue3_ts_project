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
  max-width: 1980px;
  max-height: 980px;
  min-height: 844px;
  font-size:1rem;
}

body{
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: Poppins,Rubik, Avenir, Helvetica, Arial, sans-serif, serif;
  ::v-deep.el-card__body {
    height: 100%;
  }
}

body {
  background: var(--body-Background);
}

@media (min-width: 1024px) {
 #app{
   --main-Np-gradient: linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)!important;
   --body-Background: linear-gradient(130deg, #ff0099, #5433ff 41.07%, #24c6dc 76.05%)!important;
   --feature-Background: linear-gradient(130deg, #ff0099, #5433ff 46.07%, #24c6dc 87.05%)!important;
   --feature-app-banner-Background: linear-gradient(130deg, #ff0099, #5433ff 41.07%, #24c6dc 76.05%)!important;
 }
}

#app {
  --main-Np-gradient: linear-gradient(230deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%);
  --body-Background: linear-gradient(230deg, #ff0099, #5433ff 41.07%, #24c6dc 76.05%);
  --feature-Background: linear-gradient(230deg, #ff0099, #5433ff 46.07%, #24c6dc 87.05%);
  --feature-app-banner-Background: linear-gradient(230deg, #ff0099, #5433ff 41.07%, #24c6dc 76.05%);
  background: var(--body-Background);
  font-size: 100%;
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
  scrollbar-width: 10px;
  scrollbar-base-color: green;
  scrollbar-track-color: red;
  scrollbar-arrow-color: blue;
}


</style>

