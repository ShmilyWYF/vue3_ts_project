<template>
  <div class="imageContainer" ref="imageContainer">
    <canvas ref="canvas" width="500" height="500" class="canvas"
            @wheel="wheelEvnt"
            @mousemove="onMousemove"
            @mousedown="onMousedown"
            @mouseup="onMouseUp"
    />
    <div>
      <span>
        <el-tooltip placement="top" trigger="hover" content="图片区域内拖动，滑轮放大缩小">
          <el-button type="primary" @click="R = 1;drawLineReactiv.isArrow = 0" :color="R === 1?'#212121':'#fff'">操作背景图</el-button>
        </el-tooltip>
        <el-tooltip placement="top" trigger="hover"
                    content="拖动两端即可改变尺寸,其他地方拖动位置，滑轮控制放大/缩放比例,拖动时还原比例">
        <el-button type="primary" @click="R = 2;drawLineReactiv.isArrow = 0"
                   :color="R === 2&&drawLineReactiv.isArrow ==0?'#212121':'#fff'">绘制线段</el-button>
        </el-tooltip>
        <el-tooltip placement="top" trigger="hover"
                    content="限制仅向右绘制,异常绘制修复,拖动右下角(10x10范围内)改变尺寸,区域内拖动(最上层权重大)，滑轮控制比例">
        <el-button type="primary" @click="R = 3;drawLineReactiv.isArrow = 0" :color="R === 3?'#212121':'#fff'">绘制矩形</el-button>
        </el-tooltip>
        <el-tooltip placement="top" trigger="hover"
                    content="拖动两端即可改变尺寸,其他地方拖动位置，滑轮控制放大/缩放比例,拖动时还原比例">
        <el-button type="primary" @click="R = 2;drawLineReactiv.isArrow = 1"
                   :color="drawLineReactiv.isArrow == 1?'#212121':'#fff'">绘制箭头</el-button>
        </el-tooltip>
        <el-button type="primary" @click="R = 4;drawLineReactiv.isArrow = 0" :color="R === 4?'#212121':'#fff'">截图</el-button>
        <el-button type="primary" @click="saveImg">保存本地</el-button>
      </span>
      <img :src="clipReactiv.clip" alt="截图"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import img from '@/assets/index_bunner.jpg'
// ref
const imageContainer = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  init()
})

let R = ref<number>(0);

const initData = reactive<{ w: number, h: number, ctx: CanvasRenderingContext2D, layers: any[], L: number }>({
  w: 0,
  h: 0,
  ctx: {} as CanvasRenderingContext2D,
  layers: [],
  // 内存标记
  L: -1,
})

const imgData = reactive<{
  scale: number,
  img: HTMLImageElement,
  offsetX: number,
  offsetY: number,
  startP: { x: number, y: number },
  movePos: { x: number, y: number }
}>({
  // 初始化缩放比例
  scale: 1,
  img: {} as HTMLImageElement,
  movePos: {
    x: 0,
    y: 0
  },
  // 鼠标在图像上的偏移量
  offsetX: 0,
  offsetY: 0,
  startP: {
    x: 0,
    y: 0,
  }
})

interface LineLayers {
  x: number,
  y: number,
  endx: number,
  endy: number,
  scale: number
  isArrow: number
}

interface RectLayers {
  x: number,
  y: number,
  w: number,
  h: number,
  scale: number
}

// 创建图片
const init = () => {
  // 创建图片对象
  imgData.img = new Image();
  imgData.img.src = img
  imgData.img.width = 500
  imgData.img.height = 500
  // 获取画布对象
  const {width, height} = canvas.value!.getBoundingClientRect()
  initData.w = width
  initData.h = height
  // 设置画布宽高为外层元素宽高
  canvas.value!.width = initData.w
  canvas.value!.height = initData.h
  // 获取画图上下文
  initData.ctx = <CanvasRenderingContext2D>canvas.value!.getContext('2d')
  drawImage()
}

// 绘制图片
const drawImage = () => {
  // 清除画布区域
  // initData.ctx.clearRect(0, 0, initData.w, initData.h);
  // 绘制图片
  initData.ctx.drawImage(
      imgData.img,
      0, 0,
      imgData.img.width,
      imgData.img.height,
      imgData.offsetX,
      imgData.offsetY,
      imgData.img.width * imgData.scale,
      imgData.img.height * imgData.scale
  )
}

// 线段数据
const drawLineReactiv = reactive<{
  scale: number,
  currentR: number,
  layers: LineLayers[],
  isclick: number,
  startP: { x: number, y: number },
  movePos: { x: number, y: number },
  isScale: number,
  direction: number,
  line: LineLayers,
  isArrow: number,
}>({
  scale: 1,
  layers: [],
  currentR: -1,//当前点击的矩形框
  isclick: 0, // 是否点击了线段
  startP: {
    x: 0,
    y: 0,
  },
  movePos: {
    x: 0,
    y: 0
  },
  isScale: 0,
  // 锁定方向 0为left 1为rigth
  direction: -1,
  line: {} as LineLayers,
  isArrow: 0,
})

// 矩形数据
const drawRectReactiv = reactive<{
  scale: number,
  currentR: number,
  layers: RectLayers[],
  isclick: number,
  startP: { x: number, y: number },
  movePos: { x: number, y: number },
  isScale: number,
  w: number,
  h: number,
  rect: any,
  restSize: number
}>({
  scale: 1,
  layers: [],
  currentR: -1,//当前点击的矩形框
  isclick: 0, // 是否点击了
  startP: {
    x: 0,
    y: 0,
  },
  movePos: {
    x: 0,
    y: 0
  },
  isScale: 0,
  w: 0,
  h: 0,
  rect: {},
  restSize: 0,
})

// 截图
const clipReactiv = reactive({
  startP: {
    x: 0,
    y: 0,
  },
  movePos: {
    x: 0,
    y: 0
  },
  w: 0,
  h: 0,
  clip: {} as any
})

// 绘制线段
const drawLine = (drawDate?: LineLayers) => {
  // 清除画布区域
  // if (drawLineReactiv.isScale == 1) initData.ctx.clearRect(0, 0, initData.w, initData.h);
  const draw = (x1: number, y1: number, x2: number, y2: number, color: string = '#212121', width: number = 1, scale: number = 1, isArrow: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    // 开始一段新路径
    initData.ctx.beginPath();
    // 如果拖动就还原
    initData.ctx.save();
    // 计算线段的高宽
    let w = x2 - x1;
    let h = y2 - y1;
    // 矩形中心点
    let rectCenterPoint = {x: x1 + w / 2, y: y1 + h / 2}
    initData.ctx.translate(rectCenterPoint.x * (1 - scale), rectCenterPoint.y * (1 - (scale - 0.1)))
    // 设置比例
    initData.ctx.scale(scale, scale - 0.1);
    // 设置线段颜色
    initData.ctx.strokeStyle = color
    // 设置线段宽度
    initData.ctx.lineWidth = width
    // 将路径起点移到x1,y1
    initData.ctx.moveTo(x1, y1)
    // 将路径移动到x2,y2
    initData.ctx.lineTo(x2, y2)
    // 还原状态
    initData.ctx.restore();
    // 把路径画出来
    initData.ctx.stroke()
    // 是否为箭头
    if (isArrow != 0) {
      // 绘制箭头的两个三角形
      initData.ctx.beginPath();
      initData.ctx.save();
      // 计算线段的高宽
      let w = x2 - x1;
      let h = y2 - y1;
      // 矩形中心点
      let rectCenterPoint = {x: x1 + w / 2, y: y1 + h / 2}
      initData.ctx.translate(rectCenterPoint.x * (1 - scale), rectCenterPoint.y * (1 - (scale - 0.1)))
      // 设置比例
      initData.ctx.scale(scale, scale - 0.1);
      initData.ctx.moveTo(x2, y2);
      initData.ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
      initData.ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
      initData.ctx.closePath();
      // 还原状态
      initData.ctx.restore();
      initData.ctx.fill();
    }
  }
  if (drawDate) {
    draw(drawDate.x, drawDate.y, drawDate.endx, drawDate.endy, undefined, undefined, 1, drawDate.isArrow)
  } else {
    drawLineReactiv.layers.forEach((i: LineLayers) => {
      draw(i.x, i.y, i.endx, i.endy, undefined, undefined, i.scale, i.isArrow)
    })
  }
}

// 绘制矩形
const drawRect = (points?: { x: number, y: number, h: number, w: number, scale: number }) => {
  // if (drawRectReactiv.isScale == 1) initData.ctx.clearRect(0, 0, initData.w, initData.h);
  const drawRectFn = (x: number, y: number, h: number, w: number, scale: number,i?:number) => {
    initData.ctx.beginPath();
    // 如果拖动就还原
    initData.ctx.save();
    // 矩形中心点
    initData.ctx.translate(x + w /2,y + h /2)
    // 设置比例
    initData.ctx.scale(scale, scale);
    // 还原状态
    initData.ctx.restore();
    initData.ctx.strokeRect(x, y, w * scale, h * scale);
    // 开辟辅助区域
    initData.ctx.beginPath();
    initData.ctx.strokeRect(x + w - 10, y + h - 10, 10, 10);
  }
  if (points) {
    drawRectFn(points.x, points.y, points.h, points.w, points.scale)
  } else {
    drawRectReactiv.layers.forEach((i: { x: number, y: number, h: number, w: number, scale: number },index) => {
      drawRectFn(i.x, i.y, i.h, i.w, i.scale,index)
    })
  }
}

// 截图框
const drawClipRect = () => {
  // 创建一条新路径
  initData.ctx.beginPath()
  initData.ctx.strokeRect(clipReactiv.startP.x,clipReactiv.startP.y, clipReactiv.w + 2, clipReactiv.h + 2)
}

// 统一绘制
const draw = () => {
  initData.ctx.clearRect(0, 0, initData.w, initData.h);
  drawImage()
  drawLine(drawLineReactiv.line)
  drawRect(drawRectReactiv.rect)
  drawRect()
  drawLine()
  if (R.value == 4){
    drawClipRect()
  }
}

// 滚轮事件
const wheelEvnt = (e: WheelEvent) => {
  const {clientX, clientY} = e;
  // 限制范围为图片区间
  if (moveToImgUp(clientX, clientY) && R.value === 1) {
    // 保存当前状态
    initData.ctx.save();
    // 计算缩放比例
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    imgData.scale *= delta
    // 限制比例范围
    imgData.scale = Math.min(Math.max(imgData.scale, 0.1), 5);
    initData.ctx.translate(0, 0)
    // 设置图片比例
    initData.ctx.scale(imgData.scale, imgData.scale);
    // 还原状态
    initData.ctx.restore();
  } else
    if (drawLineReactiv.isclick != 1 && R.value === 2) {
    drawLineReactiv.isScale = 1
    // 记录鼠标起始坐标
    let p = windowToCanvas(clientX, clientY)
    // 初始化
    drawLineReactiv.currentR = 0
    for (let i = 0; i < drawLineReactiv.layers.length; i++) {
      const line = drawLineReactiv.layers[i];
      const distance = pointToLineDistance(p.x, p.y, {x1: line.x, x2: line.endx, y1: line.y, y2: line.endy});
      if (distance < 5) {
        drawLineReactiv.currentR = i
        break;
      } else {
        drawLineReactiv.currentR = -1
      }
    }
    if (drawLineReactiv.currentR == -1) return false
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    drawLineReactiv.layers[drawLineReactiv.currentR].scale *= delta
    drawLineReactiv.layers[drawLineReactiv.currentR].scale = Math.min(Math.max(drawLineReactiv.layers[drawLineReactiv.currentR].scale, 0.1), 5);
  }else
      if (drawRectReactiv.isclick != 1 && R.value === 3){
    drawRectReactiv.isScale = 1
    // 记录鼠标起始坐标
    let p = windowToCanvas(clientX, clientY)
    // 初始化
    drawRectReactiv.currentR = 0
    for (let i = 0; i < drawRectReactiv.layers.length; i++) {
      const rect = drawRectReactiv.layers[i];
      const distance = isPointInRectangle(p,rect)
      if (distance) {
        drawRectReactiv.currentR = i
        break;
      } else {
        drawRectReactiv.currentR = -1
      }
    }
    if (drawRectReactiv.currentR == -1) return false
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    drawRectReactiv.layers[drawRectReactiv.currentR].scale *= delta
    drawRectReactiv.layers[drawRectReactiv.currentR].scale = Math.min(Math.max(drawRectReactiv.layers[drawRectReactiv.currentR].scale, 0.1), 5);
  }
  draw()
}

// 鼠标移入事件
const onMousemove = (e: MouseEvent) => {
  // 关闭滑动状态标识
  // drawLineReactiv.isScale = 0
  if (initData.L != 1) return false;
  const {pageX, pageY} = e

  if (R.value == 1) {
    if (!moveToImgUp(pageX, pageY)) {
      onMouseUp()
      return false
    }
    // 获取移动的坐标
    imgData.movePos = windowToCanvas(pageX, pageY)
    // 计算偏移量 end - start = 偏移量
    const x = imgData.movePos.x - imgData.startP.x;
    const y = imgData.movePos.y - imgData.startP.y;
    imgData.offsetX += x;
    imgData.offsetY += y;
    // 更新起始坐标到最新位置
    imgData.startP = {...imgData.movePos}
  } else if (R.value == 2) {
    // 获取移动的坐标
    drawLineReactiv.movePos = windowToCanvas(pageX, pageY)
    // 清除画布
    initData.ctx.clearRect(0, 0, initData.w, initData.h)
    let scale = drawLineReactiv.layers[drawLineReactiv.currentR] == undefined ? drawLineReactiv.scale : drawLineReactiv.layers[drawLineReactiv.currentR].scale;
    // != 0 选择了一个线段
    if (drawLineReactiv.isclick != 0) {
      const x = drawLineReactiv.movePos.x - drawLineReactiv.startP.x;
      const y = drawLineReactiv.movePos.y - drawLineReactiv.startP.y;
      // 如果是两端距离 则进行长度修改
      if (drawLineReactiv.direction == 0) {
        drawLineReactiv.layers[drawLineReactiv.currentR].x += x;
        drawLineReactiv.layers[drawLineReactiv.currentR].y += y;
      } else if (drawLineReactiv.direction == 1) {
        drawLineReactiv.layers[drawLineReactiv.currentR].endx += x;
        drawLineReactiv.layers[drawLineReactiv.currentR].endy += y;
      } else {
        // 计算偏移量 end - start = 偏移量
        drawLineReactiv.layers[drawLineReactiv.currentR].x += x;
        drawLineReactiv.layers[drawLineReactiv.currentR].y += y;
        drawLineReactiv.layers[drawLineReactiv.currentR].endx += x;
        drawLineReactiv.layers[drawLineReactiv.currentR].endy += y;
        drawLineReactiv.layers[drawLineReactiv.currentR].scale = drawLineReactiv.scale
      }
      // 将结束位置改为起始位置
      drawLineReactiv.startP = {...drawLineReactiv.movePos}
    } else {
      let points = <LineLayers>{
        x: drawLineReactiv.startP.x,
        y: drawLineReactiv.startP.y,
        endx: drawLineReactiv.movePos.x,
        endy: drawLineReactiv.movePos.y,
        scale: scale,
        isArrow: drawLineReactiv.isArrow,
      }
      drawLineReactiv.line = points
      // 开始绘制 动态展示
      // drawLine(points)
    }
  } else if (R.value == 3) {
    drawRectReactiv.movePos = windowToCanvas(pageX, pageY)
    drawRectReactiv.w = drawRectReactiv.movePos.x - drawRectReactiv.startP.x
    drawRectReactiv.h = drawRectReactiv.movePos.y - drawRectReactiv.startP.y

    if (drawRectReactiv.w < 0 || drawRectReactiv.h < 0){
      drawRectReactiv.w = drawRectReactiv.w > 0 ? drawRectReactiv.w : 20
      drawRectReactiv.h = drawRectReactiv.h > 0 ? drawRectReactiv.h : 20
    }

    // 清除画布
    initData.ctx.clearRect(0, 0, initData.w, initData.h)
    let scale = drawRectReactiv.layers[drawRectReactiv.currentR] == undefined ? drawRectReactiv.scale : drawRectReactiv.layers[drawRectReactiv.currentR].scale;
    // 是否选择了矩形框
    if (drawRectReactiv.isclick != 0) {
      // 判断选择的位置是否为右下角
      if (drawRectReactiv.restSize != 0) {
        const x = drawRectReactiv.movePos.x - drawRectReactiv.startP.x;
        const y = drawRectReactiv.movePos.y - drawRectReactiv.startP.y;
        let layer = drawRectReactiv.layers[drawRectReactiv.currentR];
        if (drawRectReactiv.movePos.x >= layer.x + 20 && drawRectReactiv.movePos.y >= layer.y + 30) {
          drawRectReactiv.layers[drawRectReactiv.currentR].w += x
          drawRectReactiv.layers[drawRectReactiv.currentR].h += y
        }
      } else {
        // 移动矩形框
        const x = drawRectReactiv.movePos.x - drawRectReactiv.startP.x;
        const y = drawRectReactiv.movePos.y - drawRectReactiv.startP.y;
        drawRectReactiv.layers[drawRectReactiv.currentR].x += x
        drawRectReactiv.layers[drawRectReactiv.currentR].y += y
        // 将结束位置改为起始位置
      }
      drawRectReactiv.startP = {...drawRectReactiv.movePos}
    } else {
      // 添加该条数据
      let points = {
        x: drawRectReactiv.startP.x,
        y: drawRectReactiv.startP.y,
        w: drawRectReactiv.w,
        h: drawRectReactiv.h,
        scale: scale,
      }
      drawRectReactiv.rect = points
      // 矩形框内不允许画图
      // if (drawRectReactiv.layers.length != 0){
      // for (let i = 0; i < drawRectReactiv.layers.length; i++) {
      //   const rect = drawRectReactiv.layers[i];
      //   if (isPointInRectangle(drawRectReactiv.movePos, rect)) {
      // 判断方向
      // if (drawRectReactiv.movePos.x > drawRectReactiv.startP.x && drawRectReactiv.movePos.x > rect.x){
      //   points.w = (rect.x - drawRectReactiv.startP.x - 10)
      //   drawRectReactiv.movePos.x = (rect.x - drawRectReactiv.startP.x - 10);
      // }
      // if (drawRectReactiv.movePos.y > drawRectReactiv.startP.y && drawRectReactiv.movePos.y > rect.y){
      //   points.y = (rect.y - drawRectReactiv.startP.y - 10)
      //   drawRectReactiv.movePos.y = (rect.y - drawRectReactiv.startP.y - 10);
      // }
      // }
      // }
      // }
      // drawRect(points)
    }
  }else if (R.value == 4){
    clipReactiv.movePos = windowToCanvas(pageX, pageY)
    let width = clipReactiv.movePos.x - clipReactiv.startP.x
    let height = clipReactiv.movePos.y - clipReactiv.startP.y
    clipReactiv.w = width
    clipReactiv.h = height

    let croppedImageData = initData.ctx.getImageData(clipReactiv.startP.x,clipReactiv.startP.y, width, height);
    // 创建一个新的Canvas用于绘制裁剪后的图像
    let croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    let croppedContext = croppedCanvas.getContext('2d');
    // 将裁剪后的像素数据绘制到新的Canvas上
    croppedContext!.putImageData(croppedImageData, 0, 0);
    clipReactiv.clip = croppedCanvas.toDataURL('image/png');
  }
  draw()
}

// 鼠标按下事件
const onMousedown = (e: MouseEvent) => {
  const {pageX, pageY} = e;
  initData.L = 1;
  if (R.value == 1) {
    // 记录鼠标起始坐标
    imgData.startP = windowToCanvas(pageX, pageY)
  } else if (R.value == 2) {
    drawLineReactiv.startP = windowToCanvas(pageX, pageY)
    // 初始化
    drawLineReactiv.isclick = 0
    drawLineReactiv.currentR = -1
    for (let i = 0; i < drawLineReactiv.layers.length; i++) {
      const line = drawLineReactiv.layers[i];
      const distance = pointToLineDistance(drawLineReactiv.startP.x, drawLineReactiv.startP.y, {
        x1: line.x,
        x2: line.endx,
        y1: line.y,
        y2: line.endy
      });
      if (distance < 5) {
        drawLineReactiv.currentR = i
        drawLineReactiv.isclick = 1
        break;
      } else {
        drawLineReactiv.currentR = -1
      }
    }
    if (drawLineReactiv.layers.length != 0 && drawLineReactiv.currentR != -1) {
      if (drawLineReactiv.startP.x >= drawLineReactiv.layers[drawLineReactiv.currentR].x && drawLineReactiv.startP.y + 5 >= drawLineReactiv.layers[drawLineReactiv.currentR].y && drawLineReactiv.startP.x <= drawLineReactiv.layers[drawLineReactiv.currentR].x + 20 && drawLineReactiv.startP.y <= drawLineReactiv.layers[drawLineReactiv.currentR].y + 5) {
        drawLineReactiv.direction = 0;
      } else if (drawLineReactiv.startP.x <= drawLineReactiv.layers[drawLineReactiv.currentR].endx && drawLineReactiv.startP.y + 5 >= drawLineReactiv.layers[drawLineReactiv.currentR].endy && drawLineReactiv.startP.x >= drawLineReactiv.layers[drawLineReactiv.currentR].endx - 20 && drawLineReactiv.startP.y <= drawLineReactiv.layers[drawLineReactiv.currentR].endy + 5) {
        drawLineReactiv.direction = 1;
      } else {
        drawLineReactiv.direction = -1;
      }
    }
  } else if (R.value == 3) {
    // 初始化
    drawRectReactiv.startP = windowToCanvas(pageX, pageY)
    drawRectReactiv.isclick = 0
    drawRectReactiv.currentR = -1
    for (let i = 0; i < drawRectReactiv.layers.length; i++) {
      const rect = drawRectReactiv.layers[i];
      if (isPointInRectangle(drawRectReactiv.startP, rect)) {
        // 选择第一个找到的矩形
        drawRectReactiv.isclick = 1
        drawRectReactiv.currentR = i
        break;
      }else {
        drawRectReactiv.currentR = -1
      }
    }
    if (drawRectReactiv.currentR != -1) {
      let layer = drawRectReactiv.layers[drawRectReactiv.currentR];
      let right = layer.x + layer.w;
      let botton = layer.y + layer.h;
      if (drawRectReactiv.startP.x >= right - 10 && drawRectReactiv.startP.y >= botton - 10 && drawRectReactiv.startP.x <= right && drawRectReactiv.startP.y <= botton) {
        drawRectReactiv.restSize = 1
      } else {
        drawRectReactiv.restSize = 0
      }
    }
  } else if(R.value == 4){
    clipReactiv.startP = windowToCanvas(pageX, pageY)
  }
}

// 鼠标松开
const onMouseUp = () => {
  initData.L = 0;
  drawLineReactiv.isclick = 0;
  drawRectReactiv.isclick = 0;

  if (R.value === 2 && drawLineReactiv.isclick != 1) {
    if (drawLineReactiv.line != null) drawLineReactiv.layers.push(drawLineReactiv.line)
    // 清除数据
    drawLineReactiv.line = {} as LineLayers
  }
  if (R.value === 3 && drawRectReactiv.isclick != 1) {
    if (drawRectReactiv.rect != null) drawRectReactiv.layers.push(drawRectReactiv.rect)
    // 清除数据
    drawRectReactiv.rect = null
  }
}

// 处理鼠标的位置 鼠标在画布的坐标
const windowToCanvas = (startX: number, startY: number) => {
  const {left, top, width, height} = initData.ctx.canvas.getBoundingClientRect();
  return {
    x: startX - left - (width - initData.ctx.canvas.width) / 2,
    y: startY - top - (height - initData.ctx.canvas.height) / 2
  }
}

// 处理是否处在图片范围
const moveToImgUp = (clientX: number, clientY: number): boolean => {
  const {left, top, width, height} = initData.ctx.canvas.getBoundingClientRect();
  // 获取图片坐标
  let imgleft = left + imgData.offsetX
  let imgtop = top + imgData.offsetY
  let imgrigth = imgleft + (width * imgData.scale);
  let imgbotton = imgtop + (height * imgData.scale);
  return clientX > imgleft && clientY > imgtop && clientX < imgrigth && clientY < imgbotton
}

// 判断线段距离公式
const pointToLineDistance = (x: number, y: number, line: { x1: number, y1: number, x2: number, y2: number }) => {
  const {x1, y1, x2, y2} = line;
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

// 检查点击位置是否在某个矩形内
const isPointInRectangle = (point: { x: number, y: number }, rect: { x: number, y: number, w: number, h: number },scale:number = 1) => {
  return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.w * scale &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.h * scale
  );
}

const saveImg = () => {
  let link = document.createElement('a');
  link.href = clipReactiv.clip
  link.download = 'cropped_image.png';
  link.click();
}
</script>

<style lang="scss" scoped>
.imageContainer {
  display: flex;
  gap: 1rem;
  .canvas {
    border: 1px solid #ccc;
  }
  div{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    span {
      display: flex;
      flex-direction: row;
    }
    img {
      object-fit: cover;
      max-width: 450px;
      max-height: 450px;
      overflow: hidden;
      flex: 1;
    }
  }
}
</style>
