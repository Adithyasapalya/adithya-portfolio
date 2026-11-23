import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Listen on all network interfaces (LAN/Wi-Fi)
    port: 5180,
    strictPort: false, // Automatically fallback to next available port if taken
  },
})
