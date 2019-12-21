module.exports = {
  root: true,
  env: {
    "jest/globals": true
  },
  extends: '@react-native-community',
  env: {
    "jest/globals": true
  },
  globals: {
    "flushPromises": true,
    'Intl': true
  },
  rules: {
    "comma-dangle": ["error", "never"]
  }
};
