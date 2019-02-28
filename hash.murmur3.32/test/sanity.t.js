require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var murmur332 = require('../murmur3.32.js'), sanity = require('../../sanity')
    async(function () {
        sanity.check(sanity.cryptoify(murmur332), async())
    }, function (hash) {
        okay(hash, 'b0f57ee3', 'hashes correctly')
    })
}
