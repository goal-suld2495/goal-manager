module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:jest-react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['prettier', 'jsx-a11y', '@typescript-eslint', 'jest', 'jest-react'],
  rules: {
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['methods', 'arrowFunctions'] },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    'no-console': ['error'],
    'no-debugger': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        tailingComma: 'all'
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": 0,
    "react/jsx-props-no-spreading": "off",
  },
};
