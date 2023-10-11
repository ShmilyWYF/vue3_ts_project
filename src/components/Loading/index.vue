<template>
  <div id="loading-bar-wrapper" />
</template>

<script setup lang="ts">
const name = 'Loading'
</script>

<style scoped lang="scss">
/** nprogress styles */
::v-deep#loading-bar-wrapper #nprogress {
  pointer-events: none;

  .bar {
    background: var(--main-Np-gradient);
    position: absolute;
    z-index: 3000;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
  }

  .peg {
    display: none;
    position: absolute;
    right: 0;
    width: 100px;
    height: 8px;
    opacity: 0;
    box-shadow: none;
    transform: rotate(3deg) translate(0, -4px);
  }

  .spinner {
    display: block;
    position: fixed;
    z-index: 3000;
    top: 15px;
    right: 15px;
  }

  .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-top-color: #24c6dc;
    border-left-color: #24c6dc;
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 0.4s linear infinite;
    animation: nprogress-spinner 0.4s linear infinite;
  }
}

#loading-bar-wrapper {
  position: fixed;
  width: 100px;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  height: 10px;
  border-radius: 8px;
  z-index: 2000;
  background: transparent;
  overflow: hidden;

  &.nprogress-custom-parent {
    background: var(--background-secondary);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>



