var through = require('through')

module.exports = appendage

function appendage(_options) {
  var options = _options || {},
      before = options.before || '',
      after = options.after || '',
      stream = through(write)

  return stream

  function write(buf) {
    stream.queue([before, buf.toString(), after].join(''))
  }
}
