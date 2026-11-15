import type { PluginOption } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

import {
  APPEARANCE_STORAGE_KEY,
  applyAppearance,
  DEFAULT_APPEARANCE
} from './src/shared/config/appearance-bootstrap.ts'

const APPEARANCE_SCRIPT_PATH = '/appearance-bootstrap.js'

const appearanceBootstrap = (): PluginOption => {
  const code = `{let s;try{s=JSON.parse(localStorage.getItem(${JSON.stringify(
    APPEARANCE_STORAGE_KEY
  )}))}catch{}(${applyAppearance})({...${JSON.stringify(
    DEFAULT_APPEARANCE
  )},...(s?.active!==false&&s)})}`

  return {
    name: 'appearance-bootstrap',
    configureServer: server => {
      server.middlewares.use(APPEARANCE_SCRIPT_PATH, (_req, res) => {
        res.setHeader('Content-Type', 'text/javascript')
        res.end(code)
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: APPEARANCE_SCRIPT_PATH.slice(1),
        source: code
      })
    },
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { src: APPEARANCE_SCRIPT_PATH },
        injectTo: 'head-prepend'
      }
    ]
  }
}

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
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
