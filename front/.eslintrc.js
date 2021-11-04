module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-empty-function': ['error', { allow: ['methods', 'arrowFunctions'] }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    'no-console': ['error'],
    'no-debugger': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

// TODO
// 맛달 프로젝트 보면서 환경 설정 셋팅
// 기본적인 index.ts 파일 구성
// 깃허브 프로젝트 스프린트 구성