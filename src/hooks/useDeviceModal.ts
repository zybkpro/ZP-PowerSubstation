import { reactive } from 'vue'

export interface DeviceInfo {
  name: string
  type: string
  status: string
  voltage: string
  current: string
  temperature: string
  load: string
  updatedAt: string
}

const state = reactive({
  visible: false,
  device: null as DeviceInfo | null,
})

const resolveType = (name: string) => {
  if (name.includes('高抗')) return '高压电抗器'
  if (name.includes('变压器')) return '主变压器'
  if (name.includes('隔离开关')) return '隔离开关'
  return '电力设备'
}

const buildDeviceInfo = (name: string): DeviceInfo => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    name,
    type: resolveType(name),
    status: '运行正常',
    voltage: `${(500 + Math.random() * 50).toFixed(1)} kV`,
    current: `${(80 + Math.random() * 40).toFixed(1)} A`,
    temperature: `${(32 + Math.random() * 18).toFixed(1)} °C`,
    load: `${(45 + Math.random() * 40).toFixed(1)} %`,
    updatedAt: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
  }
}

export function useDeviceModal() {
  const open = (name: string) => {
    state.device = buildDeviceInfo(name)
    state.visible = true
  }

  const close = () => {
    state.visible = false
  }

  return {
    state,
    open,
    close,
  }
}

export default useDeviceModal
