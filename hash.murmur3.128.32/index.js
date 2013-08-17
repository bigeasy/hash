var HashBlock = require('hash.block')
var util = require('util')

// 128-bit key Murmur3 for 32-bit architectures.
//
//      See: https://github.com/bigeasy/hash
//

var c1 = 0x239b961b
var c2 = 0xab0e9789
var c3 = 0x38b34ae5
var c4 = 0xa1e38b93

// As noted in the 32-bit key Murmur3, there's a fragility regarding unsigned
// integers. Edit the code gingerly, test often. The bitwise operations are
// mostly performed on signed integers. Even multiplication works as an unsigned
// integer with signed integers because the shifting and masking converts them
// into unsigned integers. Explicit conversion to unsigned integer is only
// necessary for the addition at the end of the `remainder` function.

function multiply (a, b) {
    var aHigh = (a >> 16) & 0xffff
    var aLow = a & 0xffff
    var bHigh = (b >> 16) & 0xffff
    var bLow = b & 0xffff
    var high = ((aHigh * bLow) + (aLow * bHigh)) & 0xffff
    return (high << 16) + (aLow * bLow)
}

function fmix32 (hash) {
    hash ^= hash >>> 16
    hash = multiply(hash, 0x85ebca6b)
    hash ^= hash >>> 13
    hash = multiply(hash, 0xc2b2ae35)
    hash ^= hash >>> 16
    return hash
}
function rotl32 (number, bits) {
    return (number << bits) | (number >>> 32 - bits)
}

function HashMurmur312832 (seed) {
    var length = 0

    var h1 = seed
    var h2 = seed
    var h3 = seed
    var h4 = seed

    function blocks (buffer, count) {
        for (var i = 0; i < count; i++) {
            var k1 =  buffer[i * 16] +
                     (buffer[i * 16 + 1] << 8) +
                     (buffer[i * 16 + 2] << 16) +
                     (buffer[i * 16 + 3] << 24)
            var k2 =  buffer[i * 16 + 4] +
                     (buffer[i * 16 + 5] << 8) +
                     (buffer[i * 16 + 6] << 16) +
                     (buffer[i * 16 + 7] << 24)
            var k3 =  buffer[i * 16 + 8] +
                     (buffer[i * 16 + 9] << 8) +
                     (buffer[i * 16 + 10] << 16) +
                     (buffer[i * 16 + 11] << 24)
            var k4 =  buffer[i * 16 + 12] +
                     (buffer[i * 16 + 13] << 8) +
                     (buffer[i * 16 + 14] << 16) +
                     (buffer[i * 16 + 15] << 24)

            k1 = multiply(k1, c1)
            k1 = rotl32(k1, 15)
            k1 = multiply(k1, c2)
            h1 ^= k1

            h1 = rotl32(h1, 19)
            h1 += h2
            h1 = multiply(h1, 5) + 0x561ccd1b

            k2 = multiply(k2, c2)
            k2 = rotl32(k2, 16)
            k2 = multiply(k2, c3)
            h2 ^= k2

            h2 = rotl32(h2, 17)
            h2 += h3
            h2 = multiply(h2, 5) + 0x0bcaa747

            k3 = multiply(k3, c3)
            k3 = rotl32(k3, 17)
            k3 = multiply(k3, c4)
            h3 ^= k3

            h3 = rotl32(h3, 15)
            h3 += h4
            h3 = multiply(h3, 5) + 0x96cd1c35

            k4 = multiply(k4, c4)
            k4 = rotl32(k4, 18)
            k4 = multiply(k4, c1)
            h4 ^= k4

            h4 = rotl32(h4, 13)
            h4 += h1
            h4 = multiply(h4, 5) + 0x32ac3b17
        }

        length += count * 16
    }

    function remainder (buffer, remainder) {
        var k1 = 0
        var k2 = 0
        var k3 = 0
        var k4 = 0

        switch (remainder) {
        case 15: k4 ^= buffer[14] << 16
        case 14: k4 ^= buffer[13] << 8
        case 13: k4 ^= buffer[12]
            k4 = multiply(k4, c4)
            k4 = rotl32(k4, 18)
            k4 = multiply(k4, c1)
            h4 ^= k4

        case 12: k3 ^= buffer[11] << 24
        case 11: k3 ^= buffer[10] << 16
        case 10: k3 ^= buffer[ 9] <<  8
        case  9: k3 ^= buffer[ 8]
            k3 = multiply(k3, c3)
            k3 = rotl32(k3, 17)
            k3 = multiply(k3, c4)
            h3 ^= k3

        case  8: k2 ^= buffer[ 7] << 24
        case  7: k2 ^= buffer[ 6] << 16
        case  6: k2 ^= buffer[ 5] <<  8
        case  5: k2 ^= buffer[ 4]
            k2 = multiply(k2, c2)
            k2 = rotl32(k2, 16)
            k2 = multiply(k2, c3)
            h2 ^= k2

        case  4: k1 ^= buffer[ 3] << 24
        case  3: k1 ^= buffer[ 2] << 16
        case  2: k1 ^= buffer[ 1] <<  8
        case  1: k1 ^= buffer[ 0]
            k1 = multiply(k1, c1)
            k1 = rotl32(k1, 15)
            k1 = multiply(k1, c2)
            h1 ^= k1
        }

        length += remainder

        h1 ^= length
        h2 ^= length
        h3 ^= length
        h4 ^= length

        h1 = (h1 + h2) >>> 0
        h1 = (h1 + h3) >>> 0
        h1 = (h1 + h4) >>> 0

        h2 = (h2 + h1) >>> 0
        h3 = (h3 + h1) >>> 0
        h4 = (h4 + h1) >>> 0

        h1 = fmix32(h1)
        h2 = fmix32(h2)
        h3 = fmix32(h3)
        h4 = fmix32(h4)

        h1 = (h1 + h2) >>> 0
        h1 = (h1 + h3) >>> 0
        h1 = (h1 + h4) >>> 0

        h2 = (h2 + h1) >>> 0
        h3 = (h3 + h1) >>> 0
        h4 = (h4 + h1) >>> 0

        return [ h1, h2, h3, h4 ]
    }

    HashBlock.call(this, blocks, remainder, 16)
}
util.inherits(HashMurmur312832, HashBlock)

module.exports = HashMurmur312832
