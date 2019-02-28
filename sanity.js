var events = require('events')
var util = require('util')
var cadence = require('cadence')
var delta = require('delta')

module.exports.cryptoify = function (f) {
    function Cryptoify (seed) {
        this._seed = seed
        this._buffer = Buffer.alloc(0)
    }
    util.inherits(Cryptoify, events.EventEmitter)


    Cryptoify.prototype.write = function (buffer) {
        this._buffer = Buffer.concat([ this._buffer, buffer ])
    }

    Cryptoify.prototype.end = function (buffer) {
        if (buffer) this.write(buffer)
        var hash = f(this._seed, this._buffer, 0, this._buffer.length)
        var buffer = Buffer.alloc(4)
        buffer.writeUInt32BE(hash, 0)
        this.emit('data', buffer)
        this.emit('end')
    }
    return Cryptoify
}

module.exports.check = cadence(function (async, constructor, options) {
    options || (options = {})

    var hashed = 0
    var hashes = []
    var key = Buffer.alloc(256)

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

    async(function () {
        var i = 0
        async.loop([], function () {
            if (i == 256) {
                return [ async.break ]
            }
            key[i] = i
            var hash = createHash(256 - i)
            async(function () {
                delta(async()).ee(hash).on('data', []).on('end')
                hash.end(key.slice(0, i))
            }, function (data) {
                hashes[i] = Buffer.concat(data)
                i++
            })
        })
    }, function () {
        var hash = createHash(0)
        async(function () {
            delta(async()).ee(hash).on('data', []).on('end')
            for (var i = 0; i < hashes.length; i++) {
                var blockSize = options.blockSize || hashes[i].length
                for (var j = 0, J = blockSize / 4; j < J; j++) {
                    hashes[i].writeUInt32LE(hashes[i].readUInt32BE(j * 4), j * 4)
                }
                hash.write(hashes[i].slice(0, blockSize))
            }
            hash.end()
        }, function (data) {
            return Buffer.concat(data).slice(0, 4).toString('hex')
        })
    })
})
