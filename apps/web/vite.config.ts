import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // envDir: "../../",
  optimizeDeps: {
    exclude: ["@repo/server", "@repo/email-service"], // Exclude server-side code from client-side dependencies
  },
  build: {
    rollupOptions: {
      // Making extra sure that the server is not bundled into the client
      external: ["@repo/server", "@repo/email-service"],
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
    },
  },

  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  // server: {
  //   cors: false, // disable Vite's built-in CORS setting
  // },

  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
    },
  },
});
