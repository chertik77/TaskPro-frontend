import eslintPluginReactModern from '@eslint-react/eslint-plugin'
import eslintPluginJs from '@eslint/js'
import eslintPluginQuery from '@tanstack/eslint-plugin-query'
import eslintPluginRouter from '@tanstack/eslint-plugin-router'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import eslintTypescript from 'typescript-eslint'

export default eslintTypescript.config(
  eslintPluginJs.configs.recommended,
  eslintTypescript.configs.recommended,
  eslintPluginJsxA11y.flatConfigs.strict,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReactModern.configs.recommended,
  eslintPluginReactHooks.configs['recommended-latest'],
  ...eslintPluginRouter.configs['flat/recommended'],
  ...eslintPluginQuery.configs['flat/recommended'],
  { ignores: ['**/vite-env.d.ts'] },
  {
    languageOptions: {
      globals: { ...globals.browser },
      parser: eslintTypescript.parser,
      parserOptions: { warnOnUnsupportedTypeScriptVersion: false }
    }
  },
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
        },
        {
          selector:
            'MemberExpression[object.property.name="meta"][property.name="env"]',
          message:
            'Direct access to `import.meta.env` is forbidden. Use `@/shared/config` instead.'
        }
      ],
      'newline-before-return': 'error',
      'arrow-body-style': ['warn', 'as-needed']
    }
  },
  {
    rules: {
      'jsx-a11y/no-autofocus': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
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
    files: ['**/config/*.ts'],
    rules: {
      'no-restricted-syntax': 'off'
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
          rule: '^(is|as|has|should|can|enable)[A-Z]([A-Za-z0-9]?)+',
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
  }
)
