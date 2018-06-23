var d = require('defined')
var phonetic = require('phonetic')

var kRenamed = Symbol('renamed')

function NameGenerator (seed) {
  this.last = seed || null
}
NameGenerator.prototype.next = function next () {
  this.last = phonetic.generate({
    capFirst: false,
    syllables: 2,
    seed: this.last
  })
  return this.last
}

module.exports = function (b, opts) {
  var maxLength = d(opts && opts.maxLength, 3)

  return {
    visitor: {
      Program: function () {
        this.names = new NameGenerator(this.file.opts.filename)
      },
      ReferencedIdentifier: function (path) {
        if (path.node.name.length > maxLength) {
          return
        }

        var binding = path.scope.getBinding(path.node.name)
        if (!binding) {
          return
        }
        if (binding[kRenamed]) {
          return
        }

        path.scope.rename(path.node.name, this.names.next())
        binding[kRenamed] = true
      }
    }
  }
}
