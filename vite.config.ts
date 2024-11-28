import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ghPages } from 'vite-plugin-gh-pages';
export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/Sportify-frontend/",
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
