require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var fnv = require('../index.js'), sanity = require('../../sanity')
    var HashMurmur12832 = new require('..')
    async(function () {
        sanity.check(HashMurmur12832, async())
    }, function (hash) {
        okay(hash, 'b3ece62a', 'hashes correctly')
    })
}
