require('proof')(1, prove)

async function prove (okay) {
    const HashFNV = new require('..'), sanity = require('../../sanity')
    const hash = await sanity.check(HashFNV)
    okay(hash, 'e3cbbe91', 'hashes correctly')
}
