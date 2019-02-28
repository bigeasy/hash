exports.sanity = function (okay, constructor, expected, options, callback) {
        var hashed = 0
        var hashes = []
        var summary
        var key = new Buffer(256)

        if (arguments.length == 3) {
            callback = options
            options = { twiddle: true, blockSize: 0 }
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
                var blockSize = options.blockSize || hashes[i].length
                if (options.twiddle) {
                    for (var j = 0, J = blockSize / 4; j < J; j++) {
                        hashes[i].writeUInt32LE(hashes[i].readUInt32BE(j * 4), j * 4)
                    }
                }
                hash.write(hashes[i].slice(0, blockSize))
            }
            hash.end()
        }

        function done () {
            okay(summary.slice(0, 4).toString('hex'), expected, constructor.name + ' sanity')
            callback()
        }
    }
