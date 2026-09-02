<template>
  <LayoutPanel title="故障对比">
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

const COLORS = {
  prev: {
    solid: 'rgba(255, 159, 67, 1)',
    soft: 'rgba(255, 159, 67, 0.12)',
  },
  curr: {
    solid: 'rgba(84, 160, 255, 1)',
    soft: 'rgba(84, 160, 255, 0.12)',
  },
}

const pad = (n: number) => String(n).padStart(2, '0')

const getMonthLabels = (count = 5) => {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1)
    return `${pad(d.getMonth() + 1)}月`
  })
}

const randomSeries = (len: number, min: number, max: number) =>
  sampleSize(range(min, max + 1), len)

const generateOptions = () => {
  const year = new Date().getFullYear()
  const months = getMonthLabels(5)
  const prevData = randomSeries(5, 180, 420)
  const currData = randomSeries(5, 120, 360)

  return {
    legend: {
      show: true,
      right: 0,
      top: 0,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'roundRect',
      textStyle: {
        color: 'rgba(220, 235, 255, 0.9)',
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4, 14, 32, 0.92)',
      borderColor: 'rgba(84, 160, 255, 0.35)',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(84, 160, 255, 0.08)',
        },
      },
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '2%',
      top: '22%',
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
        color: 'rgba(220, 235, 255, 0.85)',
        margin: 12,
      },
      data: months,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(180, 200, 230, 0.75)',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(200, 220, 255, 0.12)',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: `${year - 1}年`,
        type: 'bar',
        emphasis: { focus: 'series' },
        data: prevData,
        barWidth: 14,
        barGap: '40%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.04)',
          borderRadius: [4, 4, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: COLORS.prev.solid },
            { offset: 1, color: COLORS.prev.soft },
          ]),
        },
      },
      {
        name: `${year}年`,
        type: 'bar',
        emphasis: { focus: 'series' },
        data: currData,
        barWidth: 14,
        barGap: '40%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.04)',
          borderRadius: [4, 4, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: COLORS.curr.solid },
            { offset: 1, color: COLORS.curr.soft },
          ]),
        },
      },
    ],
  }
}

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
