// @ts-check

import { createIndependentModules } from 'eslint-plugin-project-structure'

/**
 * @param {string} folderName
 */
const createEntityRule = folderName => ({
  name: `${folderName} folder`,
  pattern: `src/entities/${folderName}/**`,
  allowImportsFrom: [
    '{family_3}/**',
    'src/shared/**',
    `src/entities/**/@x/${folderName}.ts`
  ],
  errorMessage: `Entities may only: (1) import within their own folder, (2) use another entity through its @x/${folderName} folder inside the target entity, or (3) import from shared modules. Direct entity-to-entity imports are not allowed.`
})

export const independentModulesConfig = createIndependentModules({
  modules: [
    {
      name: 'App folder',
      pattern: 'src/app/**',
      allowImportsFrom: [
        '{family_1}/**',
        'src/features/**',
        'src/blocks/**',
        'src/entities/**',
        'src/shared/**'
      ]
    },
    {
      name: 'Features',
      pattern: 'src/features/**',
      allowImportsFrom: ['{family_3}/**', 'src/shared/**', 'src/entities/**'],
      errorMessage:
        'A feature may only import from its own family (at least 3 common path parts), shared modules, or entities.'
    },
    {
      name: 'Blocks',
      pattern: 'src/blocks/**',
      allowImportsFrom: [
        '{family_3}/**',
        'src/shared/**',
        'src/entities/**',
        'src/features/**'
      ],
      errorMessage:
        'A block may only import from its own family (at least 3 common path parts), shared modules, entities, or features.'
    },
    createEntityRule('auth'),
    createEntityRule('user'),
    createEntityRule('board'),
    createEntityRule('column'),
    createEntityRule('card'),
    createEntityRule('dnd'),
    {
      name: 'Unknown entity',
      pattern: 'src/entities/**',
      allowImportsFrom: [],
      allowExternalImports: false,
      errorMessage:
        'This entity is not specified as an independent module in independentModules.mjs. Use createEntityRule function.'
    },
    {
      name: 'Shared',
      pattern: ['src/shared/**'],
      allowImportsFrom: ['{family}/**'],
      errorMessage: 'Shared modules can only import from other shared modules.'
    },
    {
      name: 'Unknown files',
      pattern: [['src/**', '!src/*']],
      allowImportsFrom: [],
      allowExternalImports: false,
      errorMessage:
        'This file is not specified as an independent module in independentModules.jsonc.'
    }
  ]
})
