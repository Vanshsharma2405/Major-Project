import { defineConfig } from 'vite';
import { resolve } from 'path'; 
import path from 'path';

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Configure server options
  server: {
    port: 3000,
    open: true, // Auto-open browser on server start
    cors: true, // Enable CORS
  },
  
  // Configure build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Optimize dependencies
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['gsap', 'lenis', 'swiper'],
          'icons': ['remixicon']
        }
      },
      input:{
        main: resolve(__dirname, 'index.html'),
        men: resolve(__dirname, 'Pages/men.html')
      }
    }
  },
  
  // Resolve file paths and aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
    }
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variables.scss";`
      }
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['gsap', 'lenis', 'swiper', 'remixicon']
  },
  
  // Handle assets
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.mp4', '**/*.ico'],
})

