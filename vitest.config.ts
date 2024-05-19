import path, { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '#app': path.resolve(
        __dirname,
        './node_modules/nuxt/dist/app/index.d.ts',
      ),
    },
  },
})
