<template>
  <div class="label" @click="onClick">{{ name }}</div>
</template>
<script setup lang="ts">
import { useDeviceModal } from '@/hooks/useDeviceModal'

interface PropsType {
  name: string
}
const props = defineProps<PropsType>()
const { open } = useDeviceModal()

const onClick = () => {
  open(props.name)
}
</script>
<style lang="scss" scoped>
.label {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 36px;
  padding: 0 14px;
  font-family: AlimamaFangYuanTiVF, "PingFang SC", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  white-space: nowrap;
  pointer-events: all;
  cursor: pointer;
  background: linear-gradient(
    180deg,
    rgba(var(--th-primary-rgb), 0.42) 0%,
    rgba(5, 20, 40, 82%) 100%
  );
  border: 1px solid rgba(var(--th-primary-rgb), 0.7);
  border-radius: 4px;
  box-shadow:
    0 0 10px rgba(var(--th-primary-rgb), 0.35),
    inset 0 0 14px rgba(var(--th-primary-rgb), 0.12);
  backdrop-filter: blur(4px);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
  &:hover {
    border-color: var(--th-primary);
    box-shadow:
      0 0 14px rgba(var(--th-primary-rgb), 0.55),
      inset 0 0 16px rgba(var(--th-primary-rgb), 0.2);
  }
}
</style>
