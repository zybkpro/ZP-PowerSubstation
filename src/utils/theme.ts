import { ref } from 'vue'

export type ThemeMode = 'blue' | 'green'

const STORAGE_KEY = 'station-theme'

export const themeMode = ref<ThemeMode>(
  (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'blue'
)

export function applyTheme(mode: ThemeMode) {
  themeMode.value = mode
  document.documentElement.dataset.theme = mode
  localStorage.setItem(STORAGE_KEY, mode)
}

export function toggleTheme() {
  applyTheme(themeMode.value === 'blue' ? 'green' : 'blue')
}

export function initTheme() {
  applyTheme(themeMode.value)
}
