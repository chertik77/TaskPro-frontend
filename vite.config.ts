import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: 'src/app/routes' }),
    react(),
    tsconfigPaths(),
    ViteMinifyPlugin()
  ],
  server: { port: 3000 }
})
