import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ensure static relative assets resolve correctly for GitHub Pages or static hosts
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
