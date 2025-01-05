import './src/config/config.js';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
      watch: {
        usePolling: true
    },
    port: process.env.FRONTEND_PORT ?? 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL ?? 'http://localhost:3001',
      }
    }
  }
})
