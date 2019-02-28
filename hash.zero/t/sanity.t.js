require('proof')(1, function (okay, callack) {
    var HashZero = new require('..')
    require('../../proof').sanity(okay, HashZero, '00000000', {}, callback)
})
