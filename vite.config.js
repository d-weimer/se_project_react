import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/software-development/wtwr/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
