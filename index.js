var transform = require('stream').Transform

module.exports = appendage

function appendage(_options) {
  var options = _options || {},
      before = new Buffer('' + (options.before || '')),
      after = new Buffer('' + (options.after || '')),
      append_stream = transform()

  append_stream._transform = function appendage_transform(chunk, enc, next) {
    this.push(Buffer.concat([before, chunk, after]))
    next()
  }

  return append_stream
}
