import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    allowedHosts: [
      'owlsurf.media',
      'www.owlsurf.media'
    ],
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-anime": ["animejs"],
          "vendor-motion": ["motion"],
          "vendor-theatre": ["@theatre/core"],
          "vendor-3d": ["ogl", "cobe", "postprocessing", "three"],
          "vendor-ui": ["lucide-react", "react-liquid-glass-card"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
