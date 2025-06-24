import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  { ignores: ['**/routeTree.gen.ts'] },
  { rules: { 'fsd/insignificant-slice': 'off' } },
  {
    files: ['./src/features/**'],
    rules: { 'fsd/repetitive-naming': 'off' }
  }
])
