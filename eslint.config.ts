import eslintPluginJs from '@eslint/js'
import eslintPluginQuery from '@tanstack/eslint-plugin-query'
import eslintPluginRouter from '@tanstack/eslint-plugin-router'
import { projectStructurePlugin } from 'eslint-plugin-project-structure'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import eslintTypescript from 'typescript-eslint'

import { independentModulesConfig } from './independentModules.mjs'
import eslintPluginTailwind from 'eslint-plugin-tailwindcss'

export default eslintTypescript.config(
  { ignores: ['**/vite-env.d.ts'] },
  {
    languageOptions: {
      globals: { ...globals.browser },
      parser: eslintTypescript.parser
    }
  },
  eslintPluginJs.configs.recommended,
  eslintTypescript.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  ...eslintPluginRouter.configs['flat/recommended'],
  ...eslintPluginQuery.configs['flat/recommended'],
  ...eslintPluginTailwind.configs['flat/recommended'],
  { settings: { tailwindcss: { callees: ['cn'] } } },
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'] :matches(ImportDefaultSpecifier, ImportNamespaceSpecifier)",
          message: 'Default React import is not allowed'
        },
        {
          selector: 'Identifier[name="React"]',
          message: 'Prefix React is not allowed'
        }
      ],
      'newline-before-return': 'error',
      'arrow-body-style': ['warn', 'as-needed']
    }
  },
  {
    rules: {
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] }
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            FC: 'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177'
          }
        }
      ]
    }
  },
  {
    files: ['**/ambient/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off'
    }
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/boolean-prop-naming': [
        'error',
        {
          rule: '^(is|has|should|can|enable)[A-Z]([A-Za-z0-9]?)+',
          validateNested: true
        }
      ],
      'react/destructuring-assignment': [
        'warn',
        'always',
        { destructureInSignature: 'always' }
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }
      ],
      'react/self-closing-comp': ['warn', { component: true, html: true }]
    }
  },
  //? Simplify when https://github.com/facebook/react/pull/30774 is released
  {
    plugins: { 'react-hooks': eslintPluginReactHooks },
    rules: { ...eslintPluginReactHooks.configs.recommended.rules }
  },
  {
    plugins: { 'project-structure': projectStructurePlugin },
    rules: {
      'project-structure/independent-modules': [
        'error',
        independentModulesConfig
      ]
    }
  }
)
