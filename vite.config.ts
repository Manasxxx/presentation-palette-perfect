import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  assetsInclude: ["**/*.glb"],
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
          "vendor-3d": ["ogl", "cobe", "postprocessing"],
          "vendor-lanyard": ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier", "meshline"],
          "vendor-ui": ["lucide-react", "react-liquid-glass-card"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
