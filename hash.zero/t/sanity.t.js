require('../../proof')(1, function (step, sanity, equal) {
    var HashZero = new require('..')
    sanity(HashZero, '00000000', step())
})
