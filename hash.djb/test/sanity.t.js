require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var djb = require('../djb.js'), sanity = require('../../sanity')
    async(function () {
        sanity.check(sanity.cryptoify(djb), async())
    }, function (hash) {
        okay(hash, 'bdb4b640', 'hashes correctly')
    })
}
