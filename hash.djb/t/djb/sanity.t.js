require('proof')(1, function (equal) {
    var HashDJB = new require('../..')
    var hashed = 0
    var hashes = []
    var key = new Buffer(256)

    function run (i) {
        key[i] = i
        var djb = new HashDJB(256 - i)
        djb.on('data', function (block) {
            hashes[i] = block
            if (++hashed == 256) hashHashes()
        })
        djb.on('end', function () {
            throw new Error
        })
        djb.end(key.slice(0, i))
    }

    for (var i = 0; i < 256; i++) { run(i) }

    function hashHashes () {
        var djb = new HashDJB(0)
        djb.on('data', sane)
        for (var i = 0; i < hashes.length; i++) {
            console.log(hashes[i].toString('hex'), i)
            hashes[i].writeUInt32LE(hashes[i].readUInt32BE(0), 0)
            djb.write(hashes[i])
        }
        djb.end()
    }

    function sane (buffer) {
        console.log(buffer.toString('hex'))
        equal(buffer.toString('hex'), 'bdb4b640', 'sanity')
    }
})
