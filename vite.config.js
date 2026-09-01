import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative base path for universal hosting compatibility (GitHub Pages, Vercel, Netlify, Render)
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
