const events = require('events')
const util = require('util')
const once = require('prospective/once')

module.exports.cryptoify = function (f) {
    return class extends events.EventEmitter {
        constructor (seed) {
            super()
            this._seed = seed
            this._buffer = Buffer.alloc(0)
        }

        write (buffer) {
            this._buffer = Buffer.concat([ this._buffer, buffer ])
        }

        end (buffer) {
            if (buffer) this.write(buffer)
            const hashed = f(this._seed, this._buffer, 0, this._buffer.length)
            const hash = Buffer.alloc(4)
            hash.writeUInt32BE(hashed, 0)
            this.emit('data', hash)
            this.emit('end')
        }
    }
}

module.exports.check = async function (constructor, options) {
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

    for (let i = 0; i < 256; i++) {
        key[i] = i
        const hash = createHash(256 - i)
        const data = []
        hash.on('data', chunk => data.push(chunk))
        const promise = once(hash, 'end')
        hash.end(key.slice(0, i))
        await promise
        hashes[i] = Buffer.concat(data)
    }
    const hash = createHash(0)
    const data = []
    hash.on('data', chunk => data.push(chunk))
    const promise = once(hash, 'end')
    for (let i = 0; i < hashes.length; i++) {
        const blockSize = options.blockSize || hashes[i].length
        for (let j = 0, J = blockSize / 4; j < J; j++) {
            hashes[i].writeUInt32LE(hashes[i].readUInt32BE(j * 4), j * 4)
        }
        hash.write(hashes[i].slice(0, blockSize))
    }
    hash.end()
    await promise
    return Buffer.concat(data).slice(0, 4).toString('hex')
}
