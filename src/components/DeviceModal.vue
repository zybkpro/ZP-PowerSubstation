<template>
  <Teleport to="body">
    <Transition name="device-modal">
      <div v-if="state.visible" class="device-modal-mask" @click.self="close">
        <div class="device-modal">
          <div class="modal-header">
            <div class="modal-title">设备详情</div>
            <button class="modal-close" type="button" @click="close">×</button>
          </div>
          <div class="modal-body" v-if="state.device">
            <div class="device-name">{{ state.device.name }}</div>
            <div class="device-grid">
              <div class="device-item">
                <span class="label">设备类型</span>
                <span class="value">{{ state.device.type }}</span>
              </div>
              <div class="device-item">
                <span class="label">运行状态</span>
                <span class="value status">{{ state.device.status }}</span>
              </div>
              <div class="device-item">
                <span class="label">实时电压</span>
                <span class="value">{{ state.device.voltage }}</span>
              </div>
              <div class="device-item">
                <span class="label">实时电流</span>
                <span class="value">{{ state.device.current }}</span>
              </div>
              <div class="device-item">
                <span class="label">设备温度</span>
                <span class="value">{{ state.device.temperature }}</span>
              </div>
              <div class="device-item">
                <span class="label">负载率</span>
                <span class="value">{{ state.device.load }}</span>
              </div>
            </div>
            <div class="device-footer">更新时间：{{ state.device.updatedAt }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { useDeviceModal } from '@/hooks/useDeviceModal'

const { state, close } = useDeviceModal()
</script>
<style lang="scss" scoped>
.device-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 55%);
  backdrop-filter: blur(2px);
}
.device-modal {
  width: 480px;
  color: #fff;
  background: rgba(4, 14, 32, 96%);
  border: 1px solid rgba(90, 168, 255, 45%);
  box-shadow: 0 0 24px rgba(40, 120, 255, 25%);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: linear-gradient(90deg, rgba(30, 90, 180, 55%), transparent);
  border-bottom: 1px solid rgba(90, 168, 255, 25%);
}
.modal-title {
  font-size: 16px;
  letter-spacing: 1px;
}
.modal-close {
  width: 28px;
  height: 28px;
  font-size: 22px;
  line-height: 1;
  color: #9ec7ff;
  cursor: pointer;
  background: transparent;
  border: none;
  &:hover {
    color: #fff;
  }
}
.modal-body {
  padding: 18px 20px 20px;
}
.device-name {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #b9d8ff;
}
.device-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.device-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  background: rgba(93, 101, 122, 18%);
  border: 1px solid rgba(120, 160, 220, 15%);
  .label {
    font-size: 12px;
    color: rgba(200, 220, 255, 65%);
  }
  .value {
    font-size: 15px;
    color: #e8f1ff;
  }
  .status {
    color: #00fea9;
  }
}
.device-footer {
  margin-top: 14px;
  font-size: 12px;
  color: rgba(180, 200, 230, 60%);
  text-align: right;
}
.device-modal-enter-active,
.device-modal-leave-active {
  transition: opacity 0.2s ease;
  .device-modal {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
}
.device-modal-enter-from,
.device-modal-leave-to {
  opacity: 0;
  .device-modal {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}
</style>
