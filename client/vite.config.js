import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { DEV_PORT, CLIENT_PORT } from "../env-constants";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${DEV_PORT}`,
    },
    port: CLIENT_PORT,
  },
});
