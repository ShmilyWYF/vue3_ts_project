<template>
  <div id="HistogramDailyFlow" ref="componentRef"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref, toRaw, toRef} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ElNotification} from "element-plus";
import {Ref} from "@vue/reactivity";

// 初始化天数
const date = () => {
  let arr: number[] = [];
  const mGetDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = new Date(year, month, 0);
    return d.getDate();
  }
  for (let i = 1; i < mGetDate(); i++) {
    arr.push(i);
  }
  return arr
};
// 组件ref
const componentRef = ref<HTMLDivElement>()

// 获取每天访问量
const getMonthVisits = async () => {
  await api.useAppApi.getMonthVisits().then((res:AxiosResponse)=>{
    const {data} = res.data;
    // 初始化绑定对象
    optionEchart(data)
  },(e:Error)=>{
    ElNotification.error(e.message)
  })
}

onMounted(async () => {
  await getMonthVisits();
})

const optionEchart = (data:[]) => {
  const charts = echarts.init(componentRef.value);
  const option = {
    color: ['#6EE4C2'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    title: {
      text: '每日访问人次统计',
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }],
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        restore: {
          show: true,
          title: '还原'
        },
        magicType: {
          show: true,
          type: ['line', 'bar'],
          title: {
            line: '折线图',
            bar: '树状图'
          }
        },
      },
    },
    dataset: [{
      source: {
        x:date(),
        y: data
      }
    }],
    xAxis: {},
    yAxis: {},
    series: [
      {
        name: '博客每日访问人次统计',
        type: 'bar',
        barWidth: '60%',
      },
    ]
  };
  charts.setOption(option)
}
</script>

<style scoped lang="scss">
#HistogramDailyFlow {
  flex: 1;
}
</style>
