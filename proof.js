module.exports = require('proof')(function (step, equal) {
    return {
        sanity: function (constructor, expected, twiddle, callback) {
            var hashed = 0
            var hashes = []
            var summary
            var key = new Buffer(256)

            if (arguments.length == 3) {
                callback = twiddle
                twiddle = true
            }

            function createHash (seed) {
                return typeof constructor == 'string'
                     ? require('crypto').createHash(constructor)
                     : new constructor(seed)
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
                hash.on('end', done)
                for (var i = 0; i < hashes.length; i++) {
                    if (twiddle) hashes[i].writeUInt32LE(hashes[i].readUInt32BE(0), 0)
                    console.log(hashes[i].toString('hex'))
                    hash.write(hashes[i].slice(0, 4))
                }
                hash.end()
            }

            function done () {
                equal(summary.slice(0, 4).toString('hex'), expected, constructor.name + ' sanity')
                callback()
            }
        }
    }
})
