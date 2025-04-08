import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Set it to a higher value (e.g., 1000 KB)
  },
  plugins: [react()],
})
