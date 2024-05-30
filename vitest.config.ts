import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
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
