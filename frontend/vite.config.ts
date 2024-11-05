import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    cssCodeSplit: true,
  },
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ["swiper/react"],
    exclude: ["swiper/css", "swiper/css/navigation", "swiper/css/autoplay"],
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
