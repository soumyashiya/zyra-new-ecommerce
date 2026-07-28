import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only proxy: the production API (microservices.tech) only allows the
    // production origin via CORS, so calling it directly from localhost is
    // blocked. Routing /api through the dev server makes the browser request
    // same-origin (localhost) while Vite forwards it to the API server-side,
    // where CORS does not apply. Requires api.js to use a relative BASE in dev.
    proxy: {
      '/api': {
        target: 'https://www.microservices.tech',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    // Keep ALL CSS in a single always-loaded stylesheet.
    // The pages share a `zl-*` design system whose base rules are scattered
    // across sibling CSS files (e.g. `.zl-banner` lives only in About.css but
    // is used by Services + Contact). Per-route CSS splitting would drop those
    // shared rules when landing directly on a route that doesn't import the
    // defining file. Unifying CSS restores the original behaviour (the app
    // already shipped one combined stylesheet) while JS stays code-split.
    cssCodeSplit: false,
    // Split long-lived vendor code into its own cache-stable chunk so app
    // updates don't force users to re-download React/router/animation libs.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'react-vendor'
          }
          if (id.includes('lenis')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          return undefined
        },
      },
    },
    // Warn later — route-split chunks are small; the vendor chunk is expected.
    chunkSizeWarningLimit: 900,
  },
})
