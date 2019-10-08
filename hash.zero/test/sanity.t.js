require('proof')(1, prove)

async function prove (okay) {
    const HashZero = new require('..'), sanity = require('../../sanity')
    const hash = await sanity.check(HashZero)
    okay(hash, '00000000', 'hashed correctly')
}
