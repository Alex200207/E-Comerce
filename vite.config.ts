import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@images": path.resolve(
        __dirname,
        "./src/assets/images"
      ) /*creamos un alias para resumir el codigo*/,
      "@components": path.resolve(__dirname, "./src/components"),
  
    },
  },

  
  server: {
    proxy: {
      '/api': {
         target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
       },
     },
   },
});
