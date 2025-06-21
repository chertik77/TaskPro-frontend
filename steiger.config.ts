import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  { ignores: ['**/routeTree.gen.ts'] },
  { rules: { 'fsd/insignificant-slice': 'off' } },
  {
    files: ['./src/features/**'],
    rules: { 'fsd/repetitive-naming': 'off' }
  },
  //! DISABLE FOR NOW
  {
    files: ['./src/shared/api/instance.ts'],
    rules: { 'fsd/forbidden-imports': 'off' }
  }
])
