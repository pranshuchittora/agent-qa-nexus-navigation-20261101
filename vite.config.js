import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    // 拆出 vendor 分块：首屏并行下载、后续访问命中缓存
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['motion'],
          gsap: ['gsap', 'gsap/SplitText', 'gsap/ScrollTrigger', '@gsap/react'],
        },
      },
    },
  },
  // 仅在生产构建去掉 console / debugger，开发环境保持原样
  esbuild:
    mode === 'production'
      ? { drop: ['console', 'debugger'], legalComments: 'none' }
      : {},
}))
