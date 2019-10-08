require('proof')(1, prove)

async function prove (okay) {
    const murmur332 = require('../murmur3.32.js'), sanity = require('../../sanity')
    const hash = await sanity.check(sanity.cryptoify(murmur332))
    okay(hash, 'b0f57ee3', 'hashes correctly')
}
