import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
          "vendor-gsap": ["gsap", "@gsap/react"],
          "vendor-anime": ["animejs"],
          "vendor-3d": ["ogl", "cobe", "postprocessing"],
          "vendor-ui": ["@radix-ui/react-slot", "@radix-ui/react-toast", "@radix-ui/react-tooltip", "lucide-react", "react-liquid-glass-card"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
