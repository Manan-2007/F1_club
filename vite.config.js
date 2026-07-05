import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    // Split heavy deps into their own cacheable chunks. Vite 8 runs on
    // rolldown, whose native chunking API is codeSplitting — the classic
    // rollup manualChunks object form is a hard error here.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-three', test: /node_modules\/three\// },
            { name: 'vendor-r3f', test: /node_modules\/(@react-three|three-stdlib)/ },
            { name: 'vendor-motion', test: /node_modules\/(framer-motion|motion-dom|motion-utils)/ },
            { name: 'vendor-gsap', test: /node_modules\/gsap/ },
            { name: 'vendor-react', test: /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\// },
          ],
        },
      },
    },
  },
  server: {
    // honor the port assigned by the preview harness (autoPort)
    port: Number(process.env.PORT) || 5173,
  },
})
