//@ts-ignore
const { RuleTester } = require('eslint');

export const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
});
