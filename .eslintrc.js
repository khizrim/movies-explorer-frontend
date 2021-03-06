module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': ['warn', { allow: ['_id'] }],
    'no-unused-expressions': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
