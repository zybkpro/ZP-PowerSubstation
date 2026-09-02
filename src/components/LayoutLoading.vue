<template>
  <div class="layout-loading loading-enter" v-if="loading.isLoading">
    <div class="loader">
      <div class="ring ring-outer" />
      <div class="ring ring-mid" />
      <div class="ring ring-inner" />
      <div class="hub">
        <i class="fa-solid fa-bolt blade" />
      </div>
    </div>

    <div class="progress">
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${percent}%` }" />
      </div>
      <div class="progress-meta">
        <span>{{ percent }}%</span>
        <span>{{ loading.loaded }} / {{ loading.total }}</span>
      </div>
    </div>

    <div class="loading-tip">模型资源加载中...</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface PropsType {
  loading: {
    total: number
    loaded: number
    isLoading: boolean
  }
}
const props = defineProps<PropsType>()

const percent = computed(() => {
  if (!props.loading.total) return 0
  return Math.min(
    100,
    Math.round((props.loading.loaded / props.loading.total) * 100)
  )
})
</script>
<style lang="scss" scoped>
@keyframes loading-slide-in {
  from {
    opacity: 0;
    transform: translateY(-24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.96);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
.layout-loading {
  position: absolute;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #0a1e33 0%, #000 72%);
  &.loading-enter {
    animation: loading-slide-in 0.45s ease both;
  }
}
.loader {
  position: relative;
  width: 120px;
  height: 120px;
}
.ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 50%;
}
.ring-outer {
  border-top-color: var(--th-primary, #53c9ff);
  border-right-color: rgba(var(--th-primary-rgb, 83, 201, 255), 0.25);
  animation: spin 1.4s linear infinite;
}
.ring-mid {
  inset: 12px;
  border-bottom-color: var(--th-primary-soft, #5eb0ff);
  border-left-color: rgba(var(--th-primary-rgb, 83, 201, 255), 0.2);
  animation: spin-reverse 1.1s linear infinite;
}
.ring-inner {
  inset: 26px;
  border-top-color: rgba(var(--th-primary-rgb, 83, 201, 255), 0.85);
  animation: spin 0.9s linear infinite;
}
.hub {
  position: absolute;
  inset: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--th-primary, #53c9ff);
  background: rgba(var(--th-primary-rgb, 83, 201, 255), 0.08);
  border: 1px solid rgba(var(--th-primary-rgb, 83, 201, 255), 0.35);
  border-radius: 50%;
  animation: pulse 1.6s ease-in-out infinite;
  .blade {
    font-size: 22px;
  }
}
.progress {
  width: min(360px, 70vw);
}
.progress-track {
  height: 4px;
  overflow: hidden;
  background: rgba(255, 255, 255, 8%);
  border-radius: 2px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(var(--th-primary-rgb, 83, 201, 255), 0.35),
    var(--th-primary, #53c9ff)
  );
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(var(--th-primary-rgb, 83, 201, 255), 0.55);
  transition: width 0.35s ease;
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: var(--th-text-muted, #a8c8e8);
  letter-spacing: 0.04em;
}
.loading-tip {
  font-family: AlimamaFangYuanTiVF, "PingFang SC", sans-serif;
  font-size: 14px;
  color: var(--th-primary, #53c9ff);
  letter-spacing: 0.12em;
}
</style>
