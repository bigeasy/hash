require('proof')(1, prove)

function prove (step, equal) {
    var djb = require('../djb.js'), sanity = require('../../sanity')
    equal(sanity.check(sanity.cryptoify(djb)), 'bdb4b640', 'hashes correctly')
}
