<template>
  <header
    class="layout-header"
    :class="{ 'theme-green': themeMode === 'green' }"
  >
    <div class="header-left-info">
      <span>{{ currentDate }}</span>
      <span>{{ currentWeekday }}</span>
      <span class="time">{{ currentTime }}</span>
    </div>

    <div class="header-midden">
      <div class="cn">电厂数字孪生服务平台</div>
    </div>

    <div class="header-right">
      <button
        type="button"
        class="theme-toggle"
        :title="themeMode === 'blue' ? '切换绿色主题' : '切换蓝色主题'"
        @click="toggleTheme"
      >
        <i
          :class="
            themeMode === 'blue' ? 'fa-solid fa-leaf' : 'fa-solid fa-droplet'
          "
        />
        <span>{{ themeMode === 'blue' ? '绿色主题' : '蓝色主题' }}</span>
      </button>
      <span>温度 {{ temperature }}℃</span>
    </div>

    <div class="header-bottom" />
  </header>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { themeMode, toggleTheme } from '@/utils/theme'

const WEEKDAYS = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
] as const

const currentTime = ref('00:00:00')
const currentDate = ref('0000-00-00')
const currentWeekday = ref('星期一')
const temperature = ref(33)

let timer: ReturnType<typeof setInterval> | null = null

const pad = (n: number) => String(n).padStart(2, '0')

const updateClock = () => {
  const now = new Date()
  currentTime.value = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`
  currentDate.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`
  currentWeekday.value = WEEKDAYS[now.getDay()]
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
<style lang="scss" scoped>
@mixin font-color() {
  color: rgba(230, 241, 255, 90%);
}
.layout-header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 80px;
  padding: 0 24px;
  color: #e6f1ff;
  &::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    content: '';
    background-image: url('@/assets/images/1x/header.png');
    background-image: image-set(
      url('@/assets/images/1x/header.png') 1x,
      url('@/assets/images/2x/header.png') 2x
    );
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 104px;
    transition: filter 0.3s ease;

    @media (min-resolution: 2dppx) {
      background-image: url('@/assets/images/2x/header.png');
    }
  }
  &.theme-green::before {
    filter: hue-rotate(-95deg) saturate(1.2) brightness(1.05);
  }
  > * {
    position: relative;
    z-index: 1;
  }
  .header-midden {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    padding-bottom: 8px;
    .cn {
      font-family: AlimamaFangYuanTiVF, 'PingFang SC', sans-serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.08em;
      white-space: nowrap;
      background: linear-gradient(
        0deg,
        var(--th-title-grad-start) 0%,
        #fff 99%
      );
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .header-left-info {
    display: flex;
    gap: 16px;
    align-items: center;
    padding-bottom: 10px;
    font-size: 14px;
    @include font-color;
    .time {
      letter-spacing: 0.05em;
    }
  }
  .header-right {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 10px;
    font-size: 14px;
    @include font-color;
    .theme-toggle {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      padding: 4px 10px;
      font-family: inherit;
      font-size: 13px;
      color: var(--th-primary);
      cursor: pointer;
      background: rgba(var(--th-primary-rgb), 0.12);
      border: 1px solid rgba(var(--th-primary-rgb), 0.35);
      border-radius: 14px;
      transition: background 0.2s ease, border-color 0.2s ease;
      &:hover {
        background: rgba(var(--th-primary-rgb), 0.22);
      }
    }
  }
  .header-bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;
    width: 644px;
    height: 2px;
    pointer-events: none;
    background: linear-gradient(
        63deg,
        rgba(0, 0, 0, 0%) 0%,
        var(--th-header-line) 53.72%,
        rgba(0, 0, 0, 0%) 100%
      ),
      radial-gradient(
        2% 29% at 50% 100%,
        rgba(var(--th-primary-rgb), 0.55) 0%,
        rgba(0, 0, 0, 0%) 100%
      );
    transform: translateX(-50%);
  }
}
</style>
