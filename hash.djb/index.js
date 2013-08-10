var HashStream = require('hash.stream')
var util = require('util')

function HashDJB (seed) {
    HashStream.call(this)
    this._hash = seed;
}
util.inherits(HashDJB, HashStream)

HashDJB.prototype._transform = function (block, encoding, callback) {
    var hash = this._hash

    for (var i = 0; i < block.length; i++) {
        hash = ((hash * 33) + block[i]) >>> 0
    }

    this._hash = hash

    callback()
}

HashDJB.prototype._flush = function (callback) {
    var buffer = new Buffer(4)
    buffer.writeUInt32BE(this._hash, 0)
    this.push(buffer)
    callback()
}

module.exports = HashDJB
