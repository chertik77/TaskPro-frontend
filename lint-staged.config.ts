import { defineConfig } from 'lint-staged/config'

export default defineConfig({
  '**/*.json': ['prettier --write'],
  '**/*.{ts,tsx}': ['prettier --write', 'eslint -f mo']
})
