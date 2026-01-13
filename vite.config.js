import react from '@vitejs/plugin-react-swc'
import externalGlobals from 'rollup-plugin-external-globals'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'valtio']
    }
  },
  plugins: [
    react(),
    externalGlobals({ react: 'React', valtio: 'Valtio' })
  ]
})