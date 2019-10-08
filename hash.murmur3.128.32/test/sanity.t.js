require('proof')(1, prove)

async function prove (okay) {
    const HashMurmur12832 = new require('..'), sanity = require('../../sanity')
    const hash = await sanity.check(HashMurmur12832)
    okay(hash, 'b3ece62a', 'hashes correctly')
}
