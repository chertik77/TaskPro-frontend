import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tsconfigPaths from 'vite-tsconfig-paths'

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
    tsconfigPaths(),
    ViteMinifyPlugin()
  ],
  server: { port: 4000 }
})
