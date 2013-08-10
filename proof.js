module.exports = require('proof')(function (step, equal) {
    return {
        sanity: function (constructor, expected, callback) {
            var hashed = 0
            var hashes = []
            var summary
            var key = new Buffer(256)

            function run (i) {
                key[i] = i
                var hash = new constructor(256 - i)
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
                var hash = new constructor(0)
                hash.on('data', function (buffer) {
                    summary = buffer
                })
                hash.on('end', done)
                for (var i = 0; i < hashes.length; i++) {
                    console.log(hashes[i].toString('hex'), i)
                    hashes[i].writeUInt32LE(hashes[i].readUInt32BE(0), 0)
                    hash.write(hashes[i])
                }
                hash.end()
            }

            function done () {
                console.log(summary.toString('hex'))
                equal(summary.toString('hex'), expected, constructor.name + ' sanity')
                callback()
            }
        }
    }
})
