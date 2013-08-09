var HashStream = require('hash.stream')

function BlockStream (blockSize, block, remainder) {
    this._block = block
    this._remainder = remainder
    this._buffer = new Buffer(blockSize)
    this._buffered = 0
}

BlockStream.prototype._transform = function (buffer, encoding, callback) {
    var blockSize = this._buffer.length;
    var offset = 0

    if (this._buffered) {
        var fill = Math.min(this._buffered - blockSize, buffer.length)
        buffer.copy(this._buffer, this._buffered, 0, fill)
        this._buffered = (this._buffered + fill) % blockSize
        if (!this._buffered) {
            this._block(this._buffer, 1)
        }
        offset += fill
    }

    if (offset) buffer = buffer.slice(offset)

    var blocks = Math.floor(buffer.length / blockSize)
    if (blocks) {
        this._block(buffer, blocks);
    }

    var remainder = buffer.length % blockSize
    if (remainder) {
        buffer.copy(this._buffer, 0, blocks * blockSize)
        this._buffered = remainder
    }
}

BlockStream.prototype._flush = function () {
    this.push(this._remainder(this._buffer, this._buffered))
}
