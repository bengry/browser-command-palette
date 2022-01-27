module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    /** Docs for TypeScript rules can be found at: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules */
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: { accessors: 'explicit', constructors: 'off' },
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // we do this with the compiler itself
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // TODO: for now at least...
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          object: false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // emulate the old `interface-name-prefix` rule
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': false,
      },
    ],
    '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true, ignoreProperties: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-shadow': 'off', // we use  the `@typescript-eslint` version 👇
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'prettier/prettier': 'warn', // integrate Prettier into ESLint
    'no-var': 'error',
    'no-empty-function': 'off', // covered by @typescript-eslint/no-empty-function
    'sort-imports': 'off', // covered by simple-import-sort/imports
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          [
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            '^@?\\w',
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything that does not start with a dot.
            '^[^.]',
            // Relative imports.
            // Anything that starts with a dot.
            '^\\.',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./src/manifest.ts', 'vite.config.ts', 'vite.config.content.ts'],
        peerDependencies: true,
      },
    ],
  },
};
