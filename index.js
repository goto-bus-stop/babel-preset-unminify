var prettier = require('prettier')
var beautifier = require('babel-plugin-transform-beautifier')
var wordify = require('./wordify')

function makePrettier () {
  function print (ast, opts, input) {
    var result = prettier.__debug.formatAST(ast.program, {
      semi: false,
      printWidth: 120,
      singleQuote: true,
      originalText: input
    })
    return { code: result.formatted }
  }

  return {
    generatorOverride: print
  }
}

module.exports = function () {
  return {
    plugins: [
      makePrettier,
      beautifier,
      wordify
    ]
  }
}
