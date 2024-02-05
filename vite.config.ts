import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer';
import postcsspxtoviewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',

  plugins: [
    react(),
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/global.less')}";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer,
        postcsspxtoviewport
      ]
    }
  },

  // ...其他配置项
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
