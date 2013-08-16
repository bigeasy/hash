require('../../proof')(1, function (step, sanity) {
    // todo: this is not the result from SMHasher; 0xf9376ea7.
    sanity('sha1', '26840b2d', false, step())
})
