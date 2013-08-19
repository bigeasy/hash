require('../../proof')(1, function (step, sanity, equal) {
    var HashDJB = new require('..')
    sanity(HashDJB, 'bdb4b640', step())
})
