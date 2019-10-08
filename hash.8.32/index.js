var HashStream = require('hash.stream')
var util = require('util')

function Hash832 (method, seed) {
    HashStream.call(this)
    this._method = method;
    this._hash = seed
}
util.inherits(Hash832, HashStream)

Hash832.prototype._transform = function (block, encoding, callback) {
    this._hash = this._method(block)
    callback()
}

Hash832.prototype._flush = function (callback) {
    var buffer = Buffer.alloc(4)
    buffer.writeUInt32BE(this._hash, 0)
    this.push(buffer)
    callback()
}

module.exports = Hash832
