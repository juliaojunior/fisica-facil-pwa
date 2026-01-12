import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Configuração limpa para Vercel
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  // Define a raiz do código fonte como a pasta 'client'
  root: path.resolve(__dirname, "client"),
  build: {
    // Define a saída para a pasta 'dist' na raiz do projeto (fora de client)
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    host: true,
  }
});
