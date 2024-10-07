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
    jest: true, 
  },
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react/prop-types': 'off',
    'sort-keys': 'off', // Disable sorting of keys in objects
    'react-native/sort-styles': 'off', // Disable sorting styles
  },
};
