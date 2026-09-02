<template>
  <div class="layout-panel po-panel-border panel-enter">
    <div class="po-panel__header">
      <span class="po-panel__arrow">▶</span>
      <span class="po-panel__title">{{ title }}</span>
    </div>
    <div class="po-panel__body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title?: string | number
}
defineProps<PropsType>()
</script>
<style lang="scss" scoped>
@use '@/styles/po-panel.scss' as *;

@keyframes panel-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.layout-panel {
  &.panel-enter {
    animation: panel-enter 0.45s ease both;
  }
}
</style>
