require('../../../proof')(1, function (step, sanity, equal) {
    var HashFNV = new require('../..')
    sanity(HashFNV, 'e3cbbe91', step())
})
