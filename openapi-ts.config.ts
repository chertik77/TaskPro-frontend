import { loadEnvFile } from 'process'

import { defineConfig } from '@hey-api/openapi-ts'

loadEnvFile(process.cwd() + '/.env.local')

export default defineConfig({
  input: `${process.env.VITE_API_BASE_URL}/openapi.json`,
  output: 'src/shared/api/generated',
  plugins: [
    'valibot',
    '@tanstack/react-query',
    {
      name: '@hey-api/client-axios',
      throwOnError: true,
      runtimeConfigPath: 'src/shared/lib/openapi/hey-api.ts'
    },
    { enums: 'javascript', name: '@hey-api/typescript' },
    { name: '@hey-api/sdk', validator: true }
  ]
})
