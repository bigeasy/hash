var stream = require('stream')
var util = require('util')
var ok = require('assert').ok

var __slice = [].slice

function HashStream (blockSize) {
    this._blockSize = blockSize
    stream.Transform.call(this)
}
util.inherits(HashStream, stream.Transform)

HashStream.prototype.update = function () {
    this.write.apply(this, __slice.call(arguments))
}

HashStream.prototype.digest = function (encoding) {
    ok(!encoding || [ 'base64', 'binary', 'hex' ].some(function (allowed) {
        return allowed = encoding
    }))

    this.end()

    var buffer = this.read()
    return encoding ? buffer.toString(encoding) : buffer
}

module.exports = HashStream
