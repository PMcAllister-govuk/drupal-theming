import globals from "globals";
import path from "node:path";
import js from "@eslint/js";
import jsdoc from 'eslint-plugin-jsdoc';
import importPlug from 'eslint-plugin-import';

import { fixupConfigRules } from '@eslint/compat';
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

// Set up compatibility for old-style config files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    //resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
  // Global ignores
  {
    ignores: ['dist/**','node_modules/**','eslint.config.mjs'],
  },
  
  // Import jsdoc configs
  jsdoc.configs['flat/recommended'],

  // Import old-style configs
  ...fixupConfigRules(
    compat.extends('airbnb-base','plugin:prettier/recommended','plugin:yml/recommended')
  ),
  {
    files: ["**/*.js"],
    ignores: ['postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        '_': true,
        'Drupal': true,
        'drupalSettings': true,
        'jQuery': true,
        'Cookies': true,
        'Backbone': true,
        'Modernizr': true,
        'loadjs': true,
        'Shepherd': true,
        'Sortable': true,
        'once': true,
        'CKEditor5': true,
        'tabbable': true,
      },
    },
    plugins: {
      jsdoc,
      importPlug,
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: "error",
      "prefer-const": "error",
      'jsdoc/require-description': 'warn',
      'importPlug/no-mutable-exports': ['warn'],
      'prettier/prettier': 'error',
      'yml/indent': ['error',2],
      'consistent-return': 'off',
      'no-underscore-dangle': ['off'],
      'max-nested-callbacks': ['warn',3],
      'no-param-reassign': ['off'],
      'no-prototype-builtins': ['off'],
      'no-unused-vars': ['warn'],
      'no-plusplus': ['warn', {
        'allowForLoopAfterthoughts': true,
      }],
      'operator-linebreak': ['error', 'after', {
        'overrides': {
          '?': 'ignore',
          ':': 'ignore',
        },
      }],
    },
  },
];