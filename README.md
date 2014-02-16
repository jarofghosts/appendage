appendage
=========

[![Build Status](https://travis-ci.org/jarofghosts/appendage.png?branch=master)](https://travis-ci.org/jarofghosts/appendage)

decorate some streams

## usage

```js
var appendage = require('appendage')

readable.pipe(appendage({ before: '**>', after: '\n' })).pipe(process.stdout)
// '**>everything readable streams\n'
```

## license

MIT
