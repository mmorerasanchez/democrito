import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/test-setup.ts"],
    include: ["tests/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: [
      { find: "@/lib", replacement: path.resolve(__dirname, "./registry/lib") },
      { find: "@/components", replacement: path.resolve(__dirname, "./registry") },
    ],
  },
});
