import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0)
    allowedHosts: true, // Bypass host header verification (allows all tunnel hosts)
  },
})
