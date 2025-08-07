import { defineConfig, loadEnv } from 'vite'
import type {ConfigEnv} from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer';
import postcsspxtoviewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://httpbin.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },

    base:'./',

    plugins: [
        react(),
    ],

    css: {
        preprocessorOptions: {
            scss: {
                // 启用现代 API（关键配置）
                api: 'modern-compiler' 
            },
            sass: {
                // sass 和 scss 都需要配置
                api: 'modern-compiler' 
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
