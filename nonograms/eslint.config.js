import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import path from 'path';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['eslint.config.js', 'node_modules', 'dist', 'vite.config.js'],
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          extensions: ['.js', '.json'],
          map: [['@', './src']],
        },
      },
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
    },
  },
  ...compat.extends('airbnb-base'),
  pluginJs.configs.recommended,
  prettier,
];
