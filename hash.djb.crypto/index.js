var Hash832 = require('hash.8.32')
var util = require('util')

function HashDJB (seed) {
    function djb (block) {
        for (var i = 0; i < block.length; i++) {
            seed = (seed * 33 + block[i]) >>> 0
        }
        return seed
    }
    Hash832.call(this, djb, seed)
}
util.inherits(HashDJB, Hash832)

module.exports = HashDJB
