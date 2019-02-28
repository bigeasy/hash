require('proof')(2, prove)

function prove (okay) {
    var HashBlock = require('..')
    var blocked = new HashBlock(function (block, count) {
        okay(block.toJSON().data, [ 1, 2, 3, 4 ], 'block')
        okay(1, count, 'count')
    }, function () {
        return [ 0 ]
    }, 4);
    blocked.write(new Buffer([ 1, 2 ]))
    blocked.write(new Buffer([ 3 ]))
    blocked.write(new Buffer([ 4 ]))
    blocked.end()
}
