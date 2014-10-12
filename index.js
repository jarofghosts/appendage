var transform = require('stream').Transform

module.exports = appendage

function appendage(_options) {
  var options = _options || {}

  var before = new Buffer('' + (options.before || ''))
    , after = new Buffer('' + (options.after || ''))
    , appendStream = transform()

  appendStream._transform = function appendage_transform(chunk, enc, next) {
    this.push(Buffer.concat([before, chunk, after]))

    next()
  }

  return appendStream
}
