require('proof')(2, prove)

function prove (okay) {
    var HashBlock = require('..')
    var blocked = new HashBlock(function (block, count) {
        okay(block.toJSON().data, [ 1, 2, 3, 4 ], 'block')
        okay(1, count, 'count')
    }, function () {
        return [ 0 ]
    }, 4);
    blocked.write(Buffer.from([ 1, 2 ]))
    blocked.write(Buffer.from([ 3 ]))
    blocked.write(Buffer.from([ 4 ]))
    blocked.end()
}
