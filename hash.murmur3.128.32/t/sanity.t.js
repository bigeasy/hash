require('../../proof')(1, function (step, sanity, equal) {
    var HashMurmur12832 = new require('..')
    sanity(HashMurmur12832, 'b3ece62a', step())
})
