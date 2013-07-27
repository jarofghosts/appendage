var assert = require('assert'),
    appendage = require('../'),
    stream = require('stream'),
    rs = stream.Readable(),
    ws = stream.Writable(),
    chunk = 1,
    bad = setTimeout(function () { assert.ok(false); }, 500);

rs._read = function () {
  rs.push('abc');
  rs.push('lala');
  rs.push(null);
};

ws._write = function (data, enc, next) {
  data = data.toString();
  if (chunk == 2) clearTimeout(bad);
  assert.ok(data == '88abc99' || data == '88lala99');
  chunk++;
  next();
}

rs.pipe(appendage({ before: 88, after: 99 })).pipe(ws);
