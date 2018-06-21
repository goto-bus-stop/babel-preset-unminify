var phonetic = require('phonetic')
var kRenamed = Symbol('renamed')

function NameGenerator (filename) {
  var last = filename
  function next () {
    last = phonetic.generate({
      capFirst: false,
      syllables: 2,
      seed: last
    })
    return last
  }
  return { next: next }
}

module.exports = function () {
  return {
    visitor: {
      Program: function () {
        this.names = new NameGenerator(this.file.opts.filename)
      },
      ReferencedIdentifier: function (path) {
        var binding = path.scope.getBinding(path.node.name)
        if (!binding) return
        if (binding[kRenamed]) {
          return
        }

        path.scope.rename(path.node.name, this.names.next())
        binding[kRenamed] = true
      }
    }
  }
}
