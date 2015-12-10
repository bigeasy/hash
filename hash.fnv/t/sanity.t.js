require('proof')(1, prove)

function prove (step, equal) {
    var fnv = require('../fnv.js'), sanity = require('../../sanity')
    equal(sanity.check(sanity.cryptoify(fnv)), 'e3cbbe91', 'hashes correctly')
}
