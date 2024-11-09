import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[hash].js', // Use hashed names for entry files
        chunkFileNames: 'assets/[hash].js', // Use hashed names for chunk files
        assetFileNames: 'assets/[hash][extname]', // Use hashed names for assets
      },
    },
    minify: true, // Minify the output for production
    target: 'esnext',
  },
});
