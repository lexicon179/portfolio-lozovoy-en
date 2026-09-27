import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveSiteUrl } from './scripts/site-url.mjs'

// Локальная сборка (npm run build:file) собирается в один IIFE-бандл без
// ES-модулей — иначе браузер блокирует скрипт по CORS при открытии с file://
const fileBuild = process.env.VITE_FILE_BUILD === '1'

// Абсолютный адрес для og:url и og:image — см. scripts/site-url.mjs
const siteUrl = resolveSiteUrl()

function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml(html: string) {
      return html.split('__SITE_URL__').join(siteUrl)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  build: fileBuild
    ? {
        assetsInlineLimit: 0,
        cssCodeSplit: false,
        modulePreload: false,
        rollupOptions: {
          output: {
            format: 'iife',
            inlineDynamicImports: true,
            entryFileNames: 'app.js',
            assetFileNames: 'app.[ext]',
          },
        },
      }
    : {},
})
