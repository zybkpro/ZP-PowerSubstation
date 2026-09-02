<template>
  <LayoutPanel title="系统损耗监测">
    <div class="container" ref="container"></div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import LayoutPanel from './LayoutPanel.vue'
import { nextTick, onMounted, onUnmounted } from 'vue'
import { sampleSize, range } from 'lodash'
import useEcharts from '@/hooks/useEcharts'

const { container, echarts, setOption } = useEcharts()

let timer: ReturnType<typeof setInterval> | null = null

const POINT_COUNT = 30

const randomSeries = (len: number, min: number, max: number) =>
  sampleSize(range(min, max + 1), len)

const generateOptions = () => ({
  legend: {
    show: true,
    right: 0,
    textStyle: {
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#000',
    borderColor: '#333',
    textStyle: {
      color: '#fff',
    },
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '0%',
    top: '20%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      margin: 10,
    },
    data: [...Array(POINT_COUNT).keys()],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff',
    },
    splitLine: {
      lineStyle: {
        color: '#c8c8c830',
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '损耗',
      smooth: true,
      showSymbol: false,
      data: randomSeries(POINT_COUNT, 10, 100),
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 254, 169, 1)' },
          { offset: 1, color: 'rgba(65, 138, 255, 0.2)' },
        ]),
      },
    },
  ],
})

const renderChart = () => {
  setOption(generateOptions())
}

onMounted(() => {
  nextTick(() => {
    renderChart()
    timer = setInterval(renderChart, 1000 * 8)
  })
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
