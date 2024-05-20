import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteReactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteReactRefresh()],
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
    global: {},
  },
});
