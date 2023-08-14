import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "https://secondbrain-gptgraph.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: 'public'
});
