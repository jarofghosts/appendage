var stream = require('stream')

var test = require('tape')

var appendage = require('../')

test('append to end and beginning', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , readChunk = 1

  t.plan(2)

  rs._read = function () {
    rs.push('abc')
    rs.push('lala')
    rs.push(null)
  }

  ws._write = function (_data, enc, next) {
    var data = _data.toString()

    if(readChunk === 1) t.equal(data, '88abc99')
    if(readChunk === 2) t.equal(data, '88lala99')

    readChunk++

    next()
  }

  rs.pipe(appendage({before: 88, after: 99})).pipe(ws)
})

test('append to end only', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , readChunk = 1

  t.plan(2)

  rs._read = function () {
    rs.push('abc')
    rs.push('lala')
    rs.push(null)
  }

  ws._write = function (_data, enc, next) {
    var data = _data.toString()

    if(readChunk === 1) t.equal(data, 'abc99')
    if(readChunk === 2) t.equal(data, 'lala99')
    readChunk++

    next()
  }

  rs.pipe(appendage({after: 99})).pipe(ws)
})

test('append to beginning only', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , readChunk = 1

  t.plan(2)

  rs._read = function () {
    rs.push('abc')
    rs.push('lala')
    rs.push(null)
  }

  ws._write = function (_data, enc, next) {
    var data = _data.toString()

    if(readChunk === 1) t.equal(data, '88abc')
    if(readChunk === 2) t.equal(data, '88lala')
    readChunk++

    next()
  }

  rs.pipe(appendage({before: 88})).pipe(ws)
})

test('appends nothing by default', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , readChunk = 1

  t.plan(2)

  rs._read = function () {
    rs.push('abc')
    rs.push('lala')
    rs.push(null)
  }

  ws._write = function (_data, enc, next) {
    var data = _data.toString()

    if(readChunk === 1) t.equal(data, 'abc')
    if(readChunk === 2) t.equal(data, 'lala')
    readChunk++

    next()
  }

  rs.pipe(appendage()).pipe(ws)
})
