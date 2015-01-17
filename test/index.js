var test = require('tape')

var appendage = require('../')

test('append to end and beginning', function(t) {
  t.plan(2)

  var appendStream = appendage('wanda', 'derp')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'wandaabcderp')
  })

  appendStream.write('abc')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'wandalaladerp')
  })

  appendStream.write('lala')

  appendStream.end()
})

test('toString()s input', function(t) {
  t.plan(2)

  var appendStream = appendage(88, 99)

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), '88abc99')
  })

  appendStream.write('abc')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), '88lala99')
  })

  appendStream.write('lala')

  appendStream.end()
})

test('append to end only', function(t) {
  t.plan(2)

  var appendStream = appendage(null, 99)

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'abc99')
  })

  appendStream.write('abc')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'lala99')
  })

  appendStream.write('lala')

  appendStream.end()
})

test('append to beginning only', function(t) {
  t.plan(2)

  var appendStream = appendage(88)

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), '88abc')
  })

  appendStream.write('abc')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), '88lala')
  })

  appendStream.write('lala')

  appendStream.end()
})

test('appends nothing by default', function(t) {
  t.plan(2)

  var appendStream = appendage()

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'abc')
  })

  appendStream.write('abc')

  appendStream.once('data', function(chunk) {
    t.equal(chunk.toString(), 'lala')
  })

  appendStream.write('lala')

  appendStream.end()
})
