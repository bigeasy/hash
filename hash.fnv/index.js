var HashStream = require('hash.stream')
var util = require('util')

function HashFNV (seed) {
    HashStream.call(this)
    this._hash = (seed ^ 2166136261) >>> 0
}
util.inherits(HashFNV, HashStream)

HashFNV.prototype._transform = function (block, encoding, callback) {
    var hash = this._hash

    for (var i = 0; i < block.length; i++) {
        hash = (hash ^ block[i]) >>> 0
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        hash = hash >>> 0
    }

    this._hash = hash

    callback()
}

// todo: hash unsigned, also LE or BE?
HashFNV.prototype._flush = function (callback) {
    var buffer = new Buffer(4)
    buffer.writeUInt32BE(this._hash, 0)
    this.push(buffer)
    callback()
}

module.exports = HashFNV
