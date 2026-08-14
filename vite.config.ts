import type { PluginOption } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

import {
  APPEARANCE_DEFAULTS,
  APPEARANCE_STORAGE_KEY,
  applyStoredAppearance
} from './src/shared/config/appearance-bootstrap'

const appearanceBootstrap = (): PluginOption => ({
  name: 'appearance-bootstrap',
  transformIndexHtml: {
    order: 'pre',
    handler: () => [
      {
        tag: 'script',
        children: `(${applyStoredAppearance.toString()})(${JSON.stringify(
          APPEARANCE_STORAGE_KEY
        )},${JSON.stringify(APPEARANCE_DEFAULTS)})`
      }
    ]
  }
})

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      generatedRouteTree: 'src/shared/lib/router/routeTree.gen.ts',
      routeToken: 'layout',
      routesDirectory: 'src/app/routes'
    }),
    react(),
    tailwindcss(),
    appearanceBootstrap(),
    ViteMinifyPlugin()
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 4000 }
})
