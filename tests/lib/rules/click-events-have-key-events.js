var rule = require('../../../lib/rules/click-events-have-key-events');
var RuleTester = require('eslint').RuleTester;

var tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

const errorMessage = 'Visible, non-interactive elements with click handlers' +
  ' must have at least one keyboard listener.';

tester.run('click-events-have-key-events', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><a href="" @click="doSth"></a></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button @click="doSth"></button></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><span @click="doSth" @keydown="doSth"></span></template>'
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onClick={ doSth } onKeyup="doSth"></div>
            )
          },
        }
      `
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div @click="doSth"></div></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onClick={ doSth }></div>
            )
          },
        }
      `,
      errors: [{
        message: errorMessage
      }]
    }
  ]
})