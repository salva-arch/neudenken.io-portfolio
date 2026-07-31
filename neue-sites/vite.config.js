import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        neudenken: resolve(__dirname, 'neudenken.html'),
        salvatore: resolve(__dirname, 'salvatore.html'),
        salvatore_hub: resolve(__dirname, 'salvatore_hub.html'),
        index_blog: resolve(__dirname, 'index_blog.html'),
        blog: resolve(__dirname, 'blog.html'),
        salva: resolve(__dirname, 'salva.html'),
        karriere: resolve(__dirname, 'karriere.html'),
        loader: resolve(__dirname, 'loader.html'),
      },
    },
  },
  server: {
    open: true,
  },
})
