#!/usr/bin/env node

require('proof')(2, function (equal, deepEqual) {
    var HashBlock = require('..')
    var blocked = new HashBlock(function (block, count) {
        deepEqual(block.toJSON(), [ 1, 2, 3, 4 ], 'block')
        equal(1, count, 'count')
    }, function () {
        return [ 0 ]
    }, 4);
    blocked.write(new Buffer([ 1, 2 ]))
    blocked.write(new Buffer([ 3 ]))
    blocked.write(new Buffer([ 4 ]))
    blocked.end();
})
