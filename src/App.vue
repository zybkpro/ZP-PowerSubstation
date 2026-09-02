<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutFooter />
    <LayoutLoading :loading="loading" />
    <DeviceModal />
    <div class="layout-main">
      <div class="main-left">
        <WidgetPanel04 />
        <WidgetPanel02 />
        <WidgetPanel03 />
      </div>
      <div class="main-right">
        <WidgetPanel01 />
        <WidgetPanel05 />
        <WidgetPanel06 />
      </div>
      <div class="main-middle" ref="container"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutLoading from '@/components/LayoutLoading.vue'
import DeviceModal from '@/components/DeviceModal.vue'

import WidgetPanel01 from '@/components/WidgetPanel01.vue'
import WidgetPanel02 from '@/components/WidgetPanel02.vue'
import WidgetPanel03 from '@/components/WidgetPanel03.vue'
import WidgetPanel04 from '@/components/WidgetPanel04.vue'
import WidgetPanel05 from '@/components/WidgetPanel05.vue'
import WidgetPanel06 from '@/components/WidgetPanel06.vue'

import { useStation } from '@/hooks/useStation'
import { provide } from 'vue'
const {
  container,
  loading,
  startInspect,
  stopInspect,
  startWarming,
  stopWarming,
} = useStation()

provide('events', { startInspect, stopInspect, startWarming, stopWarming })
</script>
<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: AlimamaFangYuanTiVF, "PingFang SC", sans-serif;
  background-color: #000;
  .layout-main {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    background-color: var(--th-bg-main);
    background-image: url(@/assets/images/grid_bg_01.png);
    background-repeat: repeat;
    .main-left {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 24px) / 3));
      grid-gap: 12px;
      width: 420px;
      height: calc(100% - 20px);
      pointer-events: auto;
    }
    .main-right {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 24px) / 3));
      grid-gap: 12px;
      width: 420px;
      height: calc(100% - 20px);
      pointer-events: auto;
    }
    .main-middle {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
        background-image: radial-gradient(circle, transparent 30%, #000 70%);
      }
    }
  }
}
</style>
