var events = require('events'), util = require('util')

module.exports.cryptoify = function (f) {
    function Cryptoify (seed) {
        this._seed = seed
        this._buffer = new Buffer(0)
    }
    util.inherits(Cryptoify, events.EventEmitter)


    Cryptoify.prototype.write = function (buffer) {
        this._buffer = Buffer.concat([ this._buffer, buffer ])
    }

    Cryptoify.prototype.end = function (buffer) {
        if (buffer) this.write(buffer)
        var hash = f(this._seed, this._buffer, 0, this._buffer.length)
        var buffer = new Buffer(4)
        buffer.writeUInt32BE(hash, 0)
        this.emit('data', buffer)
        this.emit('end')
    }
    return Cryptoify
}

module.exports.check = function (constructor, options) {
    options = options || { twiddle: true }
    var hashed = 0
    var hashes = []
    var summary
    var key = new Buffer(256)

    /*
    if (arguments.length == 3) {
        callback = options
        options = { twiddle: true, blockSize: 0 }
    }
    */

    function createHash (seed) {
        return new constructor(seed)
        /*
        return typeof constructor == 'string'
             ? require('crypto').createHash(constructor)
             : new constructor(seed)
        */
    }

    function run (i) {
        key[i] = i
        var hash = createHash(256 - i)
        hash.on('data', function (block) {
            hashes[i] = block
        })
        hash.on('end', function () {
            if (++hashed == 256) hashHashes()
        })
        hash.end(key.slice(0, i))
    }

    for (var i = 0; i < 256; i++) { run(i) }

    function hashHashes () {
        var hash = createHash(0)
        hash.on('data', function (buffer) {
            summary = buffer
        })
        hash.on('end', function () {})
        for (var i = 0; i < hashes.length; i++) {
            var blockSize = options.blockSize || hashes[i].length
            // if (options.twiddle) {
                for (var j = 0, J = blockSize / 4; j < J; j++) {
                    hashes[i].writeUInt32LE(hashes[i].readUInt32BE(j * 4), j * 4)
                }
            // }
            hash.write(hashes[i].slice(0, blockSize))
        }
        hash.end()
    }

    return summary.slice(0, 4).toString('hex')
}
