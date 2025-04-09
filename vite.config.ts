// airport/new-version/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// lovable-tagger might not be needed for local dev unless you use their specific features
// import { componentTagger } from "lovable-tagger"; 

export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allows access from network if needed, localhost is default
    port: 8080, // Frontend runs on this port
    // Add this proxy configuration:
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your backend server address
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    // Only include tagger if needed and configured
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));