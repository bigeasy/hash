require('proof')(1, prove)

async function prove (okay) {
    const djb = require('../djb.js'), sanity = require('../../sanity')
    const hash = await sanity.check(sanity.cryptoify(djb))
    okay(hash, 'bdb4b640', 'hashes correctly')
}
