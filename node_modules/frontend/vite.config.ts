import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // адрес твоего backend-сервера
        changeOrigin: true, // маскирует origin (полезно при CORS)
        secure: false, // отключает проверку HTTPS (если backend на http)
      },
    },
  },
});
