// https://vite.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock', // folder for mock files
      enable: true,
    })
  ],
  resolve: {
    alias: {
      'layouts': path.resolve(__dirname, './src/layouts'),
      'services': path.resolve(__dirname, './src/services'),
      'pages': path.resolve(__dirname, './src/pages'),
      'components': path.resolve(__dirname, './src/components'),
      'css': path.resolve(__dirname, './src/assets/stylesheets'),
    },
  },
})