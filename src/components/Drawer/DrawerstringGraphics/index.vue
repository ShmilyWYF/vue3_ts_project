<template>
  <div class="drawerstring-Graphics" @mousedown="boxMousedown" @mousemove="svgMousemove">
    <div class="drawerstring" ref="slider"/>
    <div class="drawerbutton" @mousedown="svgMousedown">
      <svg-icon href="#" name="circle"/>
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
  slider.value.style.height = `${elHeight.value}%`
});

// 初始化高度
const elHeight = ref<number>(50);
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
  isMousePress,
  elHeight
})

// 滑轮组区域鼠标单击触发drawer关闭回调事件
const boxMousedown = (e: any) => {
  emit('drawerPanelEvnt', false);
}

const svgMousedown = (evnt: MouseEvent) => {
  isMousePress.value = true;
  const {pageY} = evnt;
  // startPoint.value = offsetY / clientHeight.value;
  startPoint.value = pageY / clientHeight.value;
  // 给主容器添加鼠标松开事件
  DOMRange.value.addEventListener('mouseup', svgMouseup)
}

const svgMousemove = (evnt: MouseEvent) => {
  if (!isMousePress.value) return
  const {pageY} = evnt;
  // 滑动距离
  endPoint.value = Number((((pageY / clientHeight.value) - startPoint.value) * 100 + elHeight.value).toFixed(2))
  // console.log('起点百分比值：'+startPoint.value,'终点百分比值：'+(pageY / clientHeight.value))
  // console.log("差值"+((pageY / clientHeight.value)-startPoint.value))
  // console.log("最终结果:"+endPoint.value,)
  if (endPoint.value < elHeight.value) return;
  slider.value.style.height = `${endPoint.value}%`
  // 触发面板
  emit('drawerPanelEvnt', endPoint.value > elHeight.value+10);
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
  height: 20rem;
  width: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 999;
  transform: translateY(-3.5rem);

  .drawerstring {
    position: relative;
    width: 4.25%;
    background: rgb(51, 51, 51);
  }

  .drawerbutton {
    flex: .1;
    position: relative;
    z-index: 2001;

    svg {
      position: relative;
      top: 0;
    }
  }
}
</style>
