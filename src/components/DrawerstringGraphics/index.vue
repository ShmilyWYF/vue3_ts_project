<template>
  <div ref="slider" class="drawerstring-Graphics" @mousedown="boxMousedown" @mousemove="svgMousemove">
    <div class="drawerstring"/>
    <div class="drawerbutton">
      <svg-icon href="#" name="circle" @mousedown="svgMousedown"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import {onMounted, ref, toRefs} from "vue";

const props = defineProps({
  DOMRange: {
    required: true
  },
})
const emit = defineEmits(['drawerPanelEvnt'])
// 获得容器，用于鼠标事件可操作范围
const {DOMRange}: any = toRefs(props)

onMounted(() => {
  slider.value.style.transform = `translateY(${-50}%)`
});

// 储存开始地址
const startPoint = ref<number>(0)
// 储存结束地址
const endPoint = ref<number>(0)
// 鼠标按压/弹起
const isMousePress = ref<boolean>(false)
// 获取页面高
const clientHeight = ref(document.documentElement.clientHeight)
// ref绑定drawerstring-Graphics
const slider = ref<any>();
defineExpose({
  endPoint,
  slider,
  isMousePress
})

// 滑轮组区域鼠标单击触发drawer关闭回调事件
const boxMousedown = (e: any) => {
  emit('drawerPanelEvnt', false);
}

const svgMousedown = (evnt: MouseEvent) => {
  isMousePress.value = true;
  const {clientY} = evnt;
  startPoint.value = clientY / clientHeight.value;
  // 给主容器添加鼠标松开事件
  DOMRange.value.addEventListener('mouseup', svgMouseup)
}
const svgMousemove = (evnt: MouseEvent) => {
  if (!isMousePress.value) return
  const {clientY} = evnt;
  endPoint.value = Number((((clientY / clientHeight.value) - startPoint.value) * 100 - 50).toFixed(2))
  if (endPoint.value < -50) return;
  slider.value.style.transform = `translateY(${endPoint.value}%)`
  emit('drawerPanelEvnt', endPoint.value > -47);
}
const svgMouseup = (event: any) => {
  isMousePress.value = false
}

/**
 * @author WangYaFeng
 * @date 2023/10/17 0:48
 * @description 挂载body鼠标弹起事件，监听鼠标移出浏览器
 * @param null
 * @return null
 */
document.addEventListener('mouseup', (e) => {
  if (e.clientY > window.innerWidth || e.clientY < 0 || e.clientX < 0 || e.clientX > window.innerHeight) {
    isMousePress.value = false
  }
})

</script>
<style lang="scss" scoped>
.drawerstring-Graphics {
  width: 2.5%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 999;

  .drawerstring {
    position: relative;
    width: 4.25%;
    height: 70%;
    background: rgb(51, 51, 51);
  }

  .drawerbutton {
    height: 30%;
    position: relative;
    z-index: 2001;

    svg {
      position: relative;
      top: 0;
    }
  }
}
</style>
