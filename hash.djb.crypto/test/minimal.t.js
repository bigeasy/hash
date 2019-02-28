require('proof')(1, prove)

function prove (okay) {
    var buffer = new Buffer([ 7 ])
    var HashDJB = require('..')
    var djb = new HashDJB(0x7fffffff)
    djb.on('data', function (block) {
        okay(block.toString('hex'), '7fffffe6', 'one byte')
    })
    djb.end(buffer)
}
