import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app_ms/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
});
