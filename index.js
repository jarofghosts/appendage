var transform = require('stream').Transform

module.exports = appendage

function appendage(_before, _after) {
  var before = new Buffer('' + (_before || ''))
    , after = new Buffer('' + (_after || ''))
    , appendStream = transform()

  appendStream._transform = function appendageTransform(chunk, enc, next) {
    this.push(Buffer.concat([before, chunk, after]))

    next()
  }

  return appendStream
}
