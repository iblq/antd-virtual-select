process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  root: true,
  extends: '@nuofe/eslint-config-common',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  globals: { Image: true, FileReader: true, document: true, window: true },
};
