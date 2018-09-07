var d = require('defined')
var prettier = require('babel-plugin-generator-prettier')
var phonetize = require('babel-plugin-transform-phonetize')
var beautifier = require('babel-plugin-transform-beautifier')

function prettierOptions () {
  return {
    manipulateOptions: function (opts) {
      Object.assign(opts.generatorOpts, {
        semi: false,
        printWidth: 120,
        singleQuote: true
      })
    }
  }
}

module.exports = function (babel, opts) {
  babel.assertVersion(7)
  var words = d(opts.words, true)

  return {
    plugins: [
      prettier,
      prettierOptions,
      beautifier,
      words && [phonetize, { unique: true }]
    ].filter(Boolean)
  }
}
