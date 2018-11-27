module.exports = {
  root: true,
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['standard', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: false, singleQuote: true }],
    eqeqeq: ['off']
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  }
}
