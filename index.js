var through = require('through');

module.exports = appendage;

function appendage(options) {
  options = options || {};
  var before = options.before || '',
      after = options.after || '',
      tr = through(write);

  return tr;

  function write(buf) {
    this.queue([before, buf.toString(), after].join(''));
  }
}

