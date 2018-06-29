#!/usr/bin/env node

var babel = require('@babel/core')
var concat = require('simple-concat')
var args = require('minimist')(process.argv.slice(2))

if (args.h || args.help) {
  console.error('usage: unminify [file] [options]')
  process.exit(0)
}

var opts = {
  presets: [
    [__dirname, args]
  ]
}

var file = args._[0]
if (file) {
  babel.transformFile(file, opts, ondone)
} else {
  concat(process.stdin, function (err, buf) {
    if (err) throw err
    babel.transform(buf.toString(), opts, ondone)
  })
}

function ondone (err, result) {
  if (err) throw err
  console.log(result.code)
}
