<template>
  <router-view/>
</template>

<style lang="scss">
html,body,#app {
  height: 100%;
  padding: 0;
  margin: 0;
}

::v-deep.el-card__body{
  height: 100%;
}

body {
  background: #42b983;
}

#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
