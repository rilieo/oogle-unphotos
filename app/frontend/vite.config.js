import { config } from 'dotenv';
config();
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      watch: {
        usePolling: true
    },
    port: process.env.PORT ?? 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL ?? 'http://localhost:3001',
      }
    }
  }
})
