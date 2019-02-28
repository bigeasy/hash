require('proof')(1, require('cadence')(prove))


function prove (async, okay) {
    var HashFNV = new require('..'), sanity = require('../../sanity')
    async(function () {
        sanity.check(HashFNV, async())
    }, function (hash) {
        okay(hash, 'e3cbbe91', 'hashes correctly')
    })
}
