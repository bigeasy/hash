require('proof')(1, prove)

function prove (okay, callback) {
    var HashZero = new require('..')
    require('../../proof').sanity(okay, HashZero, '00000000', {}, callback)
}
