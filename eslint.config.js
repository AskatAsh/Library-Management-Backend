import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Base recommended rules
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  // Your custom config
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module', // or 'commonjs' if you're using require
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
    ignores: ['node_modules/**', 'dist/**'],
  },
]);