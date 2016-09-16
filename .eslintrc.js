module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: "airbnb/base",
  env: {
    'browser': true
  },
  "rules": {
    "no-param-reassign": 0,
    "max-len": 0,
    "no-empty-label": 0,
    "no-labels": 2,
    "space-before-keywords": 0,
    "keyword-spacing": 2,
    "space-return-throw-case": 0,
    "space-after-keywords": 0,
    "space-before-function-paren": 0,
    "padded-blocks": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    "no-loop-func": 0,
  }
};
