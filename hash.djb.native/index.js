var HashBlock = require('hash.block')
var binding = require('./build/Release/djb.node')
var util = require('util')

function HashDJB (seed) {
    var djb = new binding.Hash(seed)

    function block (buffer, count) {
        return djb.block(buffer, count * 4)
    }

    function remainder (buffer, remainder) {
        var foo= [ djb.remainder(buffer, remainder).readUInt32LE(0) ]
        return foo
    }

    HashBlock.call(this, block, remainder, 1)
}
util.inherits(HashDJB, HashBlock)

module.exports = HashDJB
