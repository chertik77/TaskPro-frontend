import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      generatedRouteTree: 'src/shared/lib/react-router/routeTree.gen.ts',
      routesDirectory: 'src/app/routes'
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    ViteMinifyPlugin()
  ],
  build: {
    rollupOptions: {
      output: { manualChunks: { '@dnd-kit/core': ['@dnd-kit/core'] } }
    }
  },
  server: { port: 3000 }
})
