#!/usr/bin/env node

require('proof')(1, function (equal) {
    var HashStream = require('..')
    var util = require('util')
    function PassThrough () {
        HashStream.call(this)
    }
    util.inherits(PassThrough, HashStream)
    PassThrough.prototype._transform = function (block, encoding, callback) {
        this.push(block)
        callback()
    }
    PassThrough.prototype._flush = function (callback) {
        callback()
    }
    var hash = new PassThrough
    hash.update(new Buffer([ 0, 1, 0, 0x0a  ]))
    equal(hash.digest('hex'), '0001000a', 'hex')
})
