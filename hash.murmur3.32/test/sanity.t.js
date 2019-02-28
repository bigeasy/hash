require('proof')(1, prove)

function prove (okay) {
    var murmur332 = require('../murmur3.32.js'), sanity = require('../../sanity')
    okay(sanity.check(sanity.cryptoify(murmur332)), 'b0f57ee3', 'hashes correctly')
}
