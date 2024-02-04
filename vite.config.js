import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteReactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteReactRefresh()],
});
