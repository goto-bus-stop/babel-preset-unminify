# babel-preset-unminify

make minified code more readable.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/babel-preset-unminify.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/babel-preset-unminify
[travis-image]: https://img.shields.io/travis/com/goto-bus-stop/babel-preset-unminify.svg?style=flat-square
[travis-url]: https://travis-ci.com/goto-bus-stop/babel-preset-unminify
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```bash
npm install babel-preset-unminify
```

## Example

Input:

```js
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.dlv=n()}(this,function(){return function(e,n,t,o){for(o=0,n=n.split?n.split("."):n;e&&o<n.length;)e=e[n[o++]];return void 0===e||o<n.length?t:e}});
//# sourceMappingURL=dlv.umd.js.map
```

Output:

```js
!(function(freci, iliet) {
  if ('object' == typeof exports && 'undefined' != typeof module) {
    module.exports = iliet()
  } else if ('function' == typeof define && define.amd) {
    define(iliet)
  } else {
    freci.dlv = iliet()
  }
})(this, function() {
  return function(habuk, hodoy, bedat, quetif) {
    quetif = 0
    for (hodoy = hodoy.split ? hodoy.split('.') : hodoy; habuk && quetif < hodoy.length; ) {
      habuk = habuk[hodoy[quetif++]]
    }
    if (void 0 === habuk || quetif < hodoy.length) {
      return bedat
    } else {
      return habuk
    }
  }
})
```

## Usage

Unlike other Babel presets, this one should normally not be used with a Babel config file. Instead, use the included CLI:

```bash
npx babel-preset-unminify < input.min.js > formatted.js
```

Or use it via the Babel Node API:

```js
var babel = require('@babel/core')
var unminify = require('babel-preset-unminify')

babel.transformSync(sourceCode, {
  presets: [unminify]
})
```

## Options

For each option, the `--` version is the CLI syntax, and the `name: val` is the Node API syntax.

### `--no-words`, `words: false`

Disable phonetic variable name generation. By default this preset finds mangled variable names (3 characters or less) and generates unique names for them. Minifiers often reuse single-character names. This option allows easily manually renaming variables afterwards, using a simple search/replace over entire files at a time. If the source code doesn't use variable name mangling or something you can disable the `words` option.

## License

[Apache-2.0](LICENSE.md)
