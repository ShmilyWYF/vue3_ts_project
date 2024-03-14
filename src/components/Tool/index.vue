<template>
  <div id="rightside" style="opacity: 1">
    <transition-group name="rightOffset" tag="div" class="rightside-config-hide">
      <el-button link type="primary" v-if="showConfig">
        <svg-icon name="qq"/>
      </el-button>
      <el-button link type="primary" v-if="showConfig">
        <svg-icon name="csdn"/>
      </el-button>
    </transition-group>
      <div class="rightside-config-show">
      <el-button link type="primary" title="Setting" @click="Setting">
        <svg-icon name="gear" id="setting"/>
      </el-button>
      <el-button link type="primary" v-show="loading" title="Back To Top" @click="backToTop">
        <svg-icon name="top"/>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SvgIcon} from "@/components";
import {onMounted, ref} from "vue";

const showConfig = ref<boolean>(false)
const loading = ref<boolean>(false)

const Setting = () => {
  showConfig.value = !showConfig.value
}

onMounted(()=>{
  window.addEventListener('scroll',()=>{
    loading.value = document.documentElement.scrollTop > 800
  })
})

const backToTop = () => {
  document.documentElement.scrollTop = 0
}
</script>

<style lang="scss" scoped>
#rightside {
  position: fixed;
  right: .25rem;
  bottom: 2rem;
  z-index: 100;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  gap: .15rem;
  .rightside-config-show , .rightside-config-hide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: .15rem;
    button , a{
      width: 2rem;
      height: 2rem;
      background: #212121;
      margin: 0;
    }
  }
}

#setting{
  animation: surround 3s linear infinite;
}
@keyframes surround {
  0%{transform: rotate(0deg);}
  25%{transform: rotate(90deg);}
  50%{transform: rotate(180deg);}
  75%{transform: rotate(27deg);}
  100%{transform: rotate(360deg);;}
}

.rightOffset-enter-active {
  animation: rightOffset .5s;
}
.rightOffset-leave-active {
  animation: rightOffset .5s reverse;
}

@keyframes rightOffset{
  from{
    transform: translateX(40px);
  }
  to{
    transform: translateX(0);
  }
}
</style>
