import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [react(), viteCommonjs()],
  base: '/',
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-moment'])],
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});