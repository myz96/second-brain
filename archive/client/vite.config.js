import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "global": {},
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: `http://localhost:8080`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: 'public'
});
