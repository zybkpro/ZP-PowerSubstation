<template>
  <div class="layout-footer">
    <div
      class="item"
      :class="{ active: state.isWarming, disabled: state.isInspect }"
      @click="warmingHandle"
    >
      {{ state.isWarming ? '取消告警' : '设备告警' }}
    </div>
    <div
      class="item"
      :class="{ active: state.isInspect, disabled: state.isWarming }"
      @click="inspectHandle"
    >
      {{ state.isInspect ? '取消巡检' : '漫游巡检' }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, inject } from 'vue'

const state = reactive({
  isWarming: false,
  isInspect: false,
})

const events = inject<any>('events')

const warmingHandle = async () => {
  if (state.isInspect) return void 0
  state.isWarming = !state.isWarming
  if (state.isWarming) {
    events.startWarming()
  } else {
    events.stopWarming()
  }
}

const inspectHandle = async () => {
  if (state.isWarming) return void 0
  state.isInspect = !state.isInspect
  if (state.isInspect) {
    await events.startInspect()
    state.isInspect = false
  } else {
    await events.stopInspect()
  }
}
</script>
<style lang="scss" scoped>
.layout-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 55%) 70%,
    rgba(0, 0, 0, 75%) 100%
  );
  .item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 48px;
    font-family: AlimamaFangYuanTiVF, "PingFang SC", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.06em;
    pointer-events: auto;
    cursor: pointer;
    background: linear-gradient(
      180deg,
      rgba(var(--th-primary-rgb), 0.38) 0%,
      rgba(5, 20, 40, 88%) 100%
    );
    border: 1px solid rgba(var(--th-primary-rgb), 0.65);
    border-radius: 4px;
    box-shadow:
      0 0 12px rgba(var(--th-primary-rgb), 0.3),
      inset 0 0 16px rgba(var(--th-primary-rgb), 0.1);
    backdrop-filter: blur(4px);
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
    &:hover:not(.disabled) {
      border-color: var(--th-primary);
      box-shadow:
        0 0 16px rgba(var(--th-primary-rgb), 0.5),
        inset 0 0 18px rgba(var(--th-primary-rgb), 0.18);
    }
    &.active {
      color: var(--th-primary);
      border-color: var(--th-primary);
      box-shadow:
        0 0 18px rgba(var(--th-primary-rgb), 0.55),
        inset 0 0 20px rgba(var(--th-primary-rgb), 0.22);
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }
  }
}
</style>
