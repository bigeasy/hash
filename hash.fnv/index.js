var Hash832 = require('hash.8.32')
var util = require('util')

function HashFNV (seed) {
    var hash = (seed ^ 2166136261) >>> 0
    function fnv (block) {
        for (var i = 0; i < block.length; i++) {
            hash = (hash ^ block[i]) >>> 0
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
            hash = hash >>> 0
        }
        return hash
    }
    Hash832.call(this, fnv, hash)
}
util.inherits(HashFNV, Hash832)

module.exports = HashFNV
