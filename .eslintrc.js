module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-native/all',
  ],
  plugins: ['react', 'react-native', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Customize your rules here
    'react-native/no-unused-styles': 'warn',
    // 'react-native/sort-styles': 'warn',
    'react/prop-types': 'off', // Turn off if you're using TypeScript
    'sort-keys': 'off',
  },
};
