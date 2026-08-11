import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify('/'),
    __IS_PREVIEW__: JSON.stringify(false),
    __READDY_PROJECT_ID__: JSON.stringify(''),
    __READDY_VERSION_ID__: JSON.stringify(''),
    __READDY_AI_DOMAIN__: JSON.stringify(''),
  },
})
