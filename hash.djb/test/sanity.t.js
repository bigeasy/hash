require('proof')(1, prove)

function prove (okay) {
    var djb = require('../djb.js'), sanity = require('../../sanity')
    okay(sanity.check(sanity.cryptoify(djb)), 'bdb4b640', 'hashes correctly')
}
