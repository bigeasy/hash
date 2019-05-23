describe('hash fnv', () => {
    const assert = require('assert')
    it('can hash', async () => {
        const fnv = require('../fnv.js'), sanity = require('../../sanity')
        const hash = await  sanity.check(sanity.cryptoify(fnv))
        assert.equal(hash, 'e3cbbe91', 'hashes correctly')
    })
})
