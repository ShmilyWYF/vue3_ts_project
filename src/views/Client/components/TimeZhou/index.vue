<template>
  <div class="timeLineContainer" ref="timeLineContainer">
    <canvas
        ref="canvas"
        @mousemove="onMousemove"
        @mouseout="onMouseout"
        @mousedown="onMousedown"
        @mouseup="timeData.mousedown = false"
    />
    <span class="container">
      <el-input-number
          v-model="timeDateRactive.h"
          class="mx-4"
          :min="0"
          :max="23"
          controls-position="right"
          @change="handleChange"
      />
      <el-input-number
          v-model="timeDateRactive.m"
          class="mx-4"
          :min="1"
          :max="59"
          controls-position="right"
          @change="handleChange"
      />
      <el-input-number
          v-model="timeDateRactive.s"
          class="mx-4"
          :min="1"
          :max="59"
          controls-position="right"
          @change="handleChange"
      />
    </span>
    <imgaeComponent/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {timeZh} from "@/utils/timeZH";
import imgaeComponent from '../image/index.vue'
// ref
const timeLineContainer = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  init()
})

// 初始化变量
const initData = reactive<{
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  ONE_HOUR_STAMP: number,
  xTime: number
}>({
  width: 0,
  height: 0,
  ctx: {} as CanvasRenderingContext2D,
  // 一小时的毫秒数
  ONE_HOUR_STAMP: 60 * 60 * 1000,
  // 中心刻度轴时间
  xTime: 0
})

// 刻度
const timeData = reactive({
  // 绘制格数
  ZOOM: 24,
  // 当前时间
  currentTime: 0,
  // 时间轴左侧起点所代表的时间，默认为当天的0点减12小时，即昨天中午12点
  startTimestamp: new Date(new Date().toISOString().slice(0, 19).replace('T', ' ')).getTime() - 12 * initData.ONE_HOUR_STAMP,
  // 计算鼠标相当于时间轴左侧的距离
  mousedownX: 0,
  // 内存标记 鼠标是否按下
  mousedown: false,
  // 缓存鼠标按下起点时间
  mousedownCacheStartTimestamp: 0
})

// 初始化方法
const init = async () => {
  // 获取外层宽高
  const {width, height} = timeLineContainer.value!.getBoundingClientRect();
  initData.width = width;
  initData.height = height;
  // 设置画布宽高为外层元素宽高
  canvas.value!.width = initData.width
  canvas.value!.height = initData.height
  // 获取画图上下文
  initData.ctx = <CanvasRenderingContext2D>canvas.value!.getContext('2d');
  // 设定中轴线标题初始值
  initData.xTime = abs.getTime()
  draw()
}

// 赋值时间输入框
let abs = new Date(timeData.startTimestamp)

// 时间输入框初始化
const timeDateRactive = reactive({
  h: abs.getHours() + 12,
  m: abs.getMinutes(),
  s: abs.getSeconds(),
})

// 时间选择器改变时触发
const handleChange = () => {
  let date = new Date(timeData.startTimestamp);
  date.setHours(timeDateRactive.h - 12)
  date.setMinutes(timeDateRactive.m)
  date.setSeconds(timeDateRactive.s)
  timeData.startTimestamp = date.getTime()
  restCtx()
}

// 绘制
const draw = () => {
  drawMiddleLine()
  drawOaw()
  drawTimeSegments()
}

// 画线段方法
const drawLine = (x1: number, y1: number, x2: number, y2: number, lineWidth: number = 1, color: string) => {
  // 开始一段新路径
  initData.ctx.beginPath();
  // 设置线段颜色
  initData.ctx.strokeStyle = color
  // 设置线段宽度
  initData.ctx.lineWidth = lineWidth
  // 将路径起点移到x1,y1
  initData.ctx.moveTo(x1, y1)
  // 将路径移动到x2,y2
  initData.ctx.lineTo(x2, y2)
  // 把路径画出来
  initData.ctx.stroke()
}

// 中轴线
const drawMiddleLine = () => {
  const lineWidth = 2
  // 线的x坐标是时间轴的中点
  const x = initData.width / 2;
  let h = initData.height * 0.03;
  let endH = h + 50;
  drawLine(x, h, x, endH, lineWidth, '#A00000');
  initData.ctx.fillText(timeZh(initData.xTime), x - 30, 10)
}

// 绘制刻度
const drawOaw = () => {
  // 一格多少毫秒
  let msPerGrid: number = initData.ONE_HOUR_STAMP
  // 时间偏移量，初始时间除每格时间取余数，
  let msOffset: number = msPerGrid - (timeData.startTimestamp % msPerGrid)
  // 每格宽度，时间轴的宽度除以总格数
  let pxPerGrid: number = initData.width / timeData.ZOOM
  // 距离偏移量，时间偏移量和每格时间比例乘每格像素
  let pxOffset: number = (msOffset / msPerGrid) * pxPerGrid

  let i: number = 0;
  while (i < timeData.ZOOM) {
    // 横坐标就是当前索引乘每格宽度
    let x: number = pxOffset + i * pxPerGrid
    // 当前刻度的毫秒数-时间，时间轴起始时间加上当前格子数乘每格代表的毫秒数
    let graduationTime: number = timeData.startTimestamp + msOffset + i * msPerGrid
    // 刻度高度为时间轴高度的20%
    let h: number = initData.height * 0.25
    let endH: number = h + 5
    // 刻度线颜色
    initData.ctx.fillStyle = '#fff';
    // 显示时间
    let computeDataTime = (dataTime: number): string => {
      let date = new Date(dataTime);
      if (date.getHours() != 0) {
        return date.getHours() + ''
      } else {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return month + '月' + day + '日'
      }
    };
    initData.ctx.fillText(computeDataTime(graduationTime), computeDataTime(graduationTime).includes('月') ? x - 13 : x - 5, h - 10);
    drawLine(x, h, x, endH, 1, '#fff')
    i++
    // 计算移动偏移率，中心轴标题
    if (i == 12) {
      // 计算出时间轴上每毫秒多少像素
      const PX_PER_MS: number = initData.width / (timeData.ZOOM * initData.ONE_HOUR_STAMP)
      // 计算所在位置的时间
      initData.xTime = timeData.startTimestamp + x / PX_PER_MS
    }
  }
}

// 绘制轴
const drawTimeSegments = () => {
  const PX_PER_MS = initData.width / (timeData.ZOOM * initData.ONE_HOUR_STAMP)

  let hours = new Date(timeData.startTimestamp).getHours();
  let minutes = new Date(timeData.startTimestamp).getMinutes();
  let totalMinutes = (hours + 12) * 60 + minutes;
  let startTime = 19.5 * 60;
  let endTime = 20.16 * 60;

  const rectangle = (h1: number, m1: number, h2: number, m2: number, color: string = '#00d0ff') => {
    let startTimestamp = new Date(timeData.startTimestamp + 12 * initData.ONE_HOUR_STAMP);
    startTimestamp.setHours(h1, m1, 0, 0);
    let endTimestamp = new Date(timeData.startTimestamp + 12 * initData.ONE_HOUR_STAMP);
    endTimestamp.setHours(h2, m2, 0, 0);

    let x: number = (startTimestamp.getTime() - timeData.startTimestamp) * PX_PER_MS;
    let w: number;
    if (x < 0) {
      x = 0
      w = (endTimestamp.getTime() - timeData.startTimestamp) * PX_PER_MS
    } else {
      w = (endTimestamp.getTime() - startTimestamp.getTime()) * PX_PER_MS
    }
    initData.ctx.fillStyle = color
    initData.ctx.fillRect(x, initData.height * 0.35, w, initData.height * 0.1)
  }

  if (totalMinutes >= startTime && totalMinutes <= endTime) {
    rectangle(19, 30, 20, 10, '#00d0ff')
  } else if (totalMinutes >= endTime && totalMinutes <= endTime + (0.17 * 60)) {
    rectangle(20, 10, 20, 20, '#4d4d4d')
  }
}

// 画布重载
const restCtx = () => {
  // 清除画布
  initData.ctx.clearRect(0, 0, initData.width, initData.height)
  // 绘制
  draw()
}

// 鼠标移入事件
const onMousemove = (e: MouseEvent) => {
  // 计算出相对画布的位置
  let {left} = canvas.value!.getBoundingClientRect()
  let x: number = e.clientX - left
  // 计算出时间轴上每毫秒多少像素
  const PX_PER_MS: number = initData.width / (timeData.ZOOM * initData.ONE_HOUR_STAMP)
  // 鼠标是否按下
  if (timeData.mousedown) {
    // 计算鼠标当前相当于鼠标按下那个点的距离
    let diffX = x - timeData.mousedownX
    // 鼠标按下时的起始时间点减去拖动过程中的偏移量，往左拖是负值，减减得正，时间就是在增加，往右拖时间就是在减少
    timeData.startTimestamp = timeData.mousedownCacheStartTimestamp - Math.round(diffX / PX_PER_MS)
    // 同步时间选择器
    let date = new Date(timeData.startTimestamp);
    // 初始是15 向左移动减少基
    timeDateRactive.h = (date.getHours() + 12) >= 24 ? date.getHours() - 12: date.getHours() + 12;
    timeDateRactive.m = date.getMinutes()
    timeDateRactive.s = date.getSeconds()
    // 不断刷新重绘就ok了
    restCtx()
  }
}

const onMouseout = () => {
  timeData.mousedown = false
}

const onMousedown = (e: MouseEvent) => {
  let {left} = canvas.value!.getBoundingClientRect()
  timeData.mousedownX = e.clientX - left
  timeData.mousedown = true
  timeData.mousedownCacheStartTimestamp = timeData.startTimestamp
}

</script>

<style lang="scss" scoped>
.timeLineContainer {
  align-items: center;
  max-height: 200px;
  flex: 1;
  flex-direction: column;
  gap: 1rem;

  .container {
    display: flex;
    position: absolute;
    bottom: 1rem;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
}
</style>
