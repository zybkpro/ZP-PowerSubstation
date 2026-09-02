<template>
  <LayoutPanel title="主变电负荷电流变化">
    <div class="container" ref="container"></div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import LayoutPanel from './LayoutPanel.vue'
import { nextTick, onMounted, onUnmounted } from 'vue'
import { sampleSize, range } from 'lodash'
import useEcharts from '@/hooks/useEcharts'

const { container, setOption } = useEcharts()

let timer: ReturnType<typeof setInterval> | null = null

const pad = (n: number) => String(n).padStart(2, '0')

const getHourLabels = (count = 7) => {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getTime() - (count - 1 - i) * 60 * 60 * 1000)
    return `${pad(d.getHours())}:00`
  })
}

const randomSeries = (len: number, min: number, max: number) =>
  sampleSize(range(min, max + 1), len)

const generateOptions = () => {
  const hours = getHourLabels(7)
  const sources = [
    randomSeries(7, 200, 900),
    randomSeries(7, 200, 900),
    randomSeries(7, 200, 900),
  ]

  return {
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
      left: '1%',
      right: '6%',
      bottom: '0%',
      top: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
        margin: 20,
      },
      data: hours,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#c8c8c8',
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
        name: '1#',
        type: 'line',
        symbol: 'none',
        smooth: true,
        lineStyle: {
          width: 2,
          color: 'rgba(0, 254, 169, 1)',
        },
        itemStyle: {
          color: 'rgba(0, 254, 169, 0.5)',
        },
        data: sources[0],
      },
      {
        name: '2#',
        type: 'line',
        symbol: 'none',
        smooth: true,
        lineStyle: {
          width: 2,
          color: 'rgba(87, 153, 214, 1)',
        },
        itemStyle: {
          color: 'rgba(87, 153, 214, 0.5)',
        },
        data: sources[1],
      },
      {
        name: '3#',
        type: 'line',
        symbol: 'none',
        smooth: true,
        lineStyle: {
          width: 2,
          color: 'rgba(241, 189, 73, 1)',
        },
        itemStyle: {
          color: 'rgba(241, 189, 73, 0.5)',
        },
        data: sources[2],
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
