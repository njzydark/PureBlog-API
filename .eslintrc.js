module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['standard', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: false, singleQuote: true, printWidth: 120 }],
    eqeqeq: ['off']
  }
}
