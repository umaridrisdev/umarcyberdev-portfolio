import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/umarcyberdev-portfolio/', // required for GitHub Pages subdirectory deployment
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
