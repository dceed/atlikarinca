import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("./lib/index.ts"),
      name: "loadelayed",
      formats: ["cjs", "es"],
      fileName: (format) => `[name].${format}.min.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        "css/style": path.resolve(__dirname, "./assets/style.pcss"),
        "css/spinner": path.resolve(__dirname, "./assets/spinner.pcss"),
        loadelayed: path.resolve(__dirname, "./lib/index.ts"),
      },
      output: {
        exports: "named",
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
