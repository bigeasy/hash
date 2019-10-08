require('proof')(1, prove)

async function prove (okay) {
    const HashDJB = new require('..'), sanity = require('../../sanity')
    const hash = await sanity.check(HashDJB)
    okay(hash, 'bdb4b640', 'hashes correctly')
}
