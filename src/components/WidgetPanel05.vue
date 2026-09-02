<template>
  <LayoutPanel title="视频监控">
    <div class="video-images">
      <div
        v-for="(item, index) in cameras"
        :key="index"
        class="video-item"
      >
        <img :src="item.src" :alt="item.label" />
        <span class="video-label">{{ item.label }}</span>
      </div>
    </div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import LayoutPanel from './LayoutPanel.vue'

const cameras = [
  { src: './images/camera-01.jpg', label: 'CAM-01 厂区外景' },
  { src: './images/camera-02.jpg', label: 'CAM-02 开关室' },
  { src: './images/camera-03.jpg', label: 'CAM-03 汽机房' },
  { src: './images/camera-04.jpg', label: 'CAM-04 变电站' },
]
</script>

<style lang="scss" scoped>
.video-images {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.video-item {
  position: relative;
  overflow: hidden;
  background-color: rgba(93, 101, 122, 20%);
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .video-label {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 2px 6px;
    font-size: 11px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 80%);
    background: linear-gradient(transparent, rgba(0, 0, 0, 65%));
  }
}
</style>
