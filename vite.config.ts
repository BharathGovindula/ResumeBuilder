import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    fs: {
      strict: true,
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: ['html2pdf.js']
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})