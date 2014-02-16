var assert = require('assert'),
    appendage = require('../'),
    stream = require('stream'),
    rs = stream.Readable(),
    ws = stream.Writable(),
    read_chunk = 1

rs._read = function () {
  rs.push('abc')
  rs.push('lala')
  rs.push(null)
}

ws._write = function (_data, enc, next) {
  var data = _data.toString()

  read_chunk === 1 && assert.strictEqual(data, 'abc99')
  read_chunk === 2 && assert.strictEqual(data, 'lala99')
  read_chunk++

  next()
}

rs.pipe(appendage({ after: 99 })).pipe(ws)
