import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      // React Native Web support (Expo web ready)
      'react-native': 'react-native-web',
      
      // Monorepo shared packages — clean, absolute imports
      '@skatehubba/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@skatehubba/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@skatehubba/store': path.resolve(__dirname, '../../packages/store/src'),
      '@skatehubba/types': path.resolve(__dirname, '../../packages/types/src'),
      
      // Local aliases
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443, // For tunneling (ngrok, localtunnel)
    },
    watch: {
      usePolling: true, // Fixes hot reload in some Docker/WSL setups
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', '@skatehubba/ui'],
  },
});
