require('../../proof')(1, function (step, sanity, equal) {
    var HashMurmur332 = new require('..')
    sanity(HashMurmur332, 'b0f57ee3', step())
})
