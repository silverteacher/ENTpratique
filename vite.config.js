import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this project at https://<user>.github.io/ENTpratique/,
  // so production assets need that prefix. The dev server stays at the root.
  base: command === 'build' ? '/ENTpratique/' : '/',
}))
