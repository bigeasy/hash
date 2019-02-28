require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var fnv = require('../fnv.js'), sanity = require('../../sanity')
    async(function () {
        sanity.check(sanity.cryptoify(fnv), async())
    }, function (hash) {
        okay(hash, 'e3cbbe91', 'hashes correctly')
    })
}
