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
    // 필요한 경우 포트 설정이나 기본 서버 설정만 남깁니다.
    port: 5173, // 원하는 포트 설정
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
