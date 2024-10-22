import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',  // Allow access from the network
    port: 5173,       // You can change the port if needed
  },
});


// ? no port open
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { fileURLToPath, URL } from 'node:url';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['swiper'],
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
// });