import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'stockui.harico.io.vn',
      '.harico.io.vn',
    ],
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    },
    watch: {
      usePolling: true,
    },
  },
})
