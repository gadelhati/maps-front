import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: `/maps/`,
  resolve: {
    alias: {
      src: "/src",
    },
  },
  plugins: [react()],
  server: {
    host: true,
    port: 10000,
    allowedHosts: ["maps-front.onrender.com"]
  }
})
