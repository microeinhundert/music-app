module.exports = {
  root: true,
  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb'
  ],
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'max-len': 'off',
    'indent': 'off',
    'one-var': ['error', 'always']
  }
}
