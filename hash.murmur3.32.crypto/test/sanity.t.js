require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var HashMurmur332 = new require('..'), sanity = require('../../sanity')
    async(function () {
        sanity.check(HashMurmur332, async())
    }, function (hash) {
        okay(hash, 'b0f57ee3', 'hashes correctly')
    })
}
