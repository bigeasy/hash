require('proof')(1, require('cadence')(prove))


function prove (async, okay) {
    var HashDJB = new require('..'), sanity = require('../../sanity')
    async(function () {
        sanity.check(HashDJB, async())
    }, function (hash) {
        okay(hash, 'bdb4b640', 'hashes correctly')
    })
}
