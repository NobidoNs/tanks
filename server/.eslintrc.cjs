/**
 * @fileoverview eslint configuration file.
 * @author Alvin Lin (alvin@omgimanerd.tech)
 */
module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
  }
}
