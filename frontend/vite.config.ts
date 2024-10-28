import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    cssCodeSplit: true,
  },
  plugins: [react()],
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
    include: [
      "swiper",
      "swiper/css",
      "swiper/css/navigation",
      "swiper/css/autoplay",
    ],
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  base: "/gn50/",
});
