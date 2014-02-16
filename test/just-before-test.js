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

  read_chunk === 1 && assert.strictEqual(data, '88abc')
  read_chunk === 2 && assert.strictEqual(data, '88lala')
  read_chunk++

  next()
}

rs.pipe(appendage({ before: 88 })).pipe(ws)
