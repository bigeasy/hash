require('proof')(1, prove)

function prove (step, equal) {
    var murmur332 = require('../murmur3.32.js'), sanity = require('../../sanity')
    equal(sanity.check(sanity.cryptoify(murmur332)), 'b0f57ee3', 'hashes correctly')
}
