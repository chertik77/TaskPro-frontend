import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

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
    ViteMinifyPlugin()
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 4000 }
})
