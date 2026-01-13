import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'valtio']
    }
  }
})