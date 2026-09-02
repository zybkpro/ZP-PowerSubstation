import { createApp } from 'vue'
import App from './App.vue'
import autofit from 'autofit.js'
import '@/assets/fonts/AlimamaFangYuanTiVF.css'
import '@/styles/theme.scss'
import { initTheme } from '@/utils/theme'

initTheme()

const boostrap = async () => {
  const app = createApp(App)
  app.mount('#app')

  const ScreenSize = {
    big: [2560, 1440],
    normal: [1920, 1080],
    small: [1280, 720],
  }['normal']

  autofit.init({
    el: '#app',
    dw: ScreenSize[0],
    dh: ScreenSize[1],
    resize: true,
  })
}

boostrap()
