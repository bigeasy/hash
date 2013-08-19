var HashStream = require('hash.stream')
var binary = require('./build/Release/djb.node')
var util = require('util')

function HashDJB (seed) {
    HashStream.call(this)
    this._hash = new (binary.Hash)(seed)
}
util.inherits(HashDJB, HashStream)

HashDJB.prototype._transform = function (block, encoding, callback) {
    this._hash.block(block)
    callback()
}

HashDJB.prototype._flush = function (callback) {
    var digest = this._hash.remainder()
    for (var i = 0, I = digest.length / 4; i < I; i++) {
        digest.writeUInt32BE(digest.readUInt32LE(i * 4), i * 4)
    }
    this.push(digest)
    callback()
}

module.exports = HashDJB
