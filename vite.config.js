import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteReactRefresh from "@vitejs/plugin-react-refresh";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), ViteReactRefresh(), mkcert()],
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
    global: {},
  },
});
