require('proof')(1, prove)

function prove (okay, callback) {
    // todo: this is not the result from SMHasher; 0xf9376ea7.
    require('../../proof').sanity(okay, 'sha1', '26840b2d', { twiddle: false, blockSize: 4 }, callback)
}
