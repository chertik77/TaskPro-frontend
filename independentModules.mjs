// @ts-check

import { createIndependentModules } from 'eslint-plugin-project-structure'

/**
 * @param {string} folderName
 */
const createEntityRule = folderName => ({
  name: `${folderName} folder`,
  pattern: `src/entities/${folderName}/**`,
  allowImportsFrom: [
    '{family_3}/**/!(index.ts)',
    'src/shared/**/index.ts',
    `src/entities/**/@x/${folderName}.ts`
  ],
  errorMessage: `Entities may only: (1) import within their own folder, (2) use another entity through its @x/${folderName} folder inside the target entity, or (3) import from shared modules through their public api (index.ts). Direct entity-to-entity imports are not allowed and imports within the entity folder from index.ts are not allowed.`
})

export const independentModulesConfig = createIndependentModules({
  modules: [
    {
      name: 'App folder',
      pattern: 'src/app/**',
      allowImportsFrom: [
        '{family_1}/**/!(index.ts)',
        'src/features/**/index.ts',
        'src/widgets/**/index.ts',
        'src/pages/**/index.ts',
        'src/entities/**/index.ts',
        'src/shared/**/index.ts'
      ],
      errorMessage: `App may only import from its own family (at least 1 common path part), features, widgets, entities, or shared modules through their public api (index.ts). Imports within the app folder from index.ts are not allowed.`
    },
    {
      name: 'Features',
      pattern: 'src/features/**',
      allowImportsFrom: [
        '{family_3}/**/!(index.ts)',
        'src/shared/**/index.ts',
        'src/entities/**/index.ts'
      ],
      errorMessage:
        'A feature may only import from its own family (at least 3 common path parts), shared modules, or entities through their public api (index.ts). Imports within the feature folder from index.ts are not allowed.'
    },
    {
      name: 'Pages',
      pattern: 'src/pages/**',
      allowImportsFrom: [
        '{family}/**/!(index.ts)',
        'src/widgets/**/index.ts',
        'src/shared/**/index.ts',
        'src/entities/**/index.ts',
        'src/features/**/index.ts'
      ],
      errorMessage:
        'A page may only import shared modules, widgets, entities, or features through their public api (index.ts). Imports within the pages folder from index.ts are not allowed.'
    },
    {
      name: 'Widgets',
      pattern: 'src/widgets/**',
      allowImportsFrom: [
        '{family_3}/**/!(index.ts)',
        'src/shared/**/index.ts',
        'src/entities/**/index.ts',
        'src/features/**/index.ts'
      ],
      errorMessage:
        'A widget may only import from its own family (at least 3 common path parts), shared modules, entities, or features through their public api (index.ts). Imports within the widget folder from index.ts are not allowed.'
    },
    createEntityRule('board'),
    createEntityRule('card'),
    createEntityRule('column'),
    createEntityRule('user'),
    createEntityRule('session'),
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
