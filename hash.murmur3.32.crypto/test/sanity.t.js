require('proof')(1, prove)

async function prove (okay) {
    const HashMurmur332 = new require('..'), sanity = require('../../sanity')
    const hash = await sanity.check(HashMurmur332)
    okay(hash, 'b0f57ee3', 'hashes correctly')
}
