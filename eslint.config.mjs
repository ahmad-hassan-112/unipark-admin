import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    extends: [ 'next' ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-debugger': 'off',
      'array-bracket-spacing': [ 'error', 'always' ],
      'block-spacing': [ 'error' ],
      'comma-dangle': [ 'error', 'always-multiline' ],
      'eol-last': [ 'error', 'always' ],
      indent: [ 'error', 2 ],
      'keyword-spacing': [ 'error', { before: true } ],
      'newline-after-var': [ 'error', 'always' ],
      'no-multi-spaces': [ 'error' ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '[A-Z]',
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
        },
      ],
      'object-curly-spacing': [ 'error', 'always' ],
      quotes: [ 'error', 'single' ],
      semi: [ 'error', 'always' ],
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      'space-before-function-paren': [ 'error', 'always' ],
      'comma-spacing': 'error',
      'arrow-parens': [ 'error', 'as-needed' ],
    },
  }),
];

export default eslintConfig;
