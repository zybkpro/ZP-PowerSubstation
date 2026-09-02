import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import stylelintPlugin from 'vite-plugin-stylelint'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'

/** 相对路径：同时兼容 nginx 子目录与 GitHub Pages */
const ASSET_BASE = '.'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  define: {
    'import.meta.env.VITE_API_DOMAIN': JSON.stringify(
      mode === 'production' ? ASSET_BASE : ''
    ),
  },
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    mode === 'production' && stylelintPlugin({ fix: true }),
    visualizer({ open: false }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'border-radius-small': '0px',
          'border-radius-medium': '0px',
          'border-radius-large': '0px',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8090,
    open: true,
    proxy: {
      '/bridge': {
        target: 'http://192.168.100.125:8081',
        changeOrigin: true,
      },
    },
  },
}))
