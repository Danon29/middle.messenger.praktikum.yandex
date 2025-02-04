import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  root: '.',
  server: {
    https: {
      key: fs.readFileSync(path.resolve('C:/Praktikum/certs/key.pem')),
      cert: fs.readFileSync(path.resolve('C:/Praktikum/certs/cert.pem'))
    },
    port: 3000
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@icons': '/public/icons'
    }
  }
})
