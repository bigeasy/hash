var HashStream = require('hash.stream')
var util = require('util')

function BlockStream (blocks, remainder, blockSize) {
    this._blocks = blocks
    this._remainder = remainder
    this._buffer = new Buffer(blockSize)
    this._buffered = 0
    HashStream.call(this)
}
util.inherits(BlockStream, HashStream)

BlockStream.prototype._transform = function (buffer, encoding, callback) {
    var blockSize = this._buffer.length
    var offset = 0

    if (this._buffered) {
        var fill = Math.min(this._buffered - blockSize, buffer.length)
        buffer.copy(this._buffer, this._buffered, 0, fill)
        this._buffered = (this._buffered + fill) % blockSize
        if (!this._buffered) {
            this._blocks(this._buffer, 1)
        }
        offset += fill
    }

    if (offset) buffer = buffer.slice(offset)

    var blocks = Math.floor(buffer.length / blockSize)
    if (blocks) {
        this._blocks(buffer, blocks)
    }

    var remainder = buffer.length % blockSize
    if (remainder) {
        buffer.copy(this._buffer, 0, blocks * blockSize)
        this._buffered = remainder
    }

    callback()
}

BlockStream.prototype._flush = function (callback) {
    this.push(this._remainder(this._buffer, this._buffered))
    callback()
}

module.exports = BlockStream