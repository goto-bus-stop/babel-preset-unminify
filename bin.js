#!/usr/bin/env node

var babel = require('@babel/core')
var args = require('minimist')(process.argv.slice(2))

var file = args._[0]
if (!file) {
  console.error('usage: unminify [file] [options]')
  process.exit(1)
}

babel.transformFile(file, {
  presets: [
    [__dirname, args]
  ]
}, function (err, result) {
  if (err) throw err
  console.log(result.code)
})
