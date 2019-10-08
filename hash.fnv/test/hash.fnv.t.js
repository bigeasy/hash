require('proof')(1, async (okay) => {
    const fnv = require('../fnv.js'), sanity = require('../../sanity')
    const hash = await  sanity.check(sanity.cryptoify(fnv))
    okay(hash, 'e3cbbe91', 'hashes correctly')
})
