require('proof')(1, require('cadence')(prove))

function prove (async, okay) {
    var HashZero = new require('..'), sanity = require('../../sanity')
    async(function () {
        sanity.check(HashZero, async())
    }, function (hash) {
        okay(hash, '00000000', 'hashed correctly')
    })
}
