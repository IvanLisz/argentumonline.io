import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
});