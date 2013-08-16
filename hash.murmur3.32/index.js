var HashBlock = require('hash.block')
var util = require('util')

var c1 = 0xcc9e2d51
var c2 = 0x1b873593

function multiply (a, b) {
    var aHigh = (a >> 16) & 0xffff
    var aLow = a & 0xffff
    var bHigh = (b >> 16) & 0xffff
    var bLow = b & 0xffff
    var high = ((aHigh * bLow) + (aLow * bHigh)) & 0xffff
    return (high << 16) + (aLow * bLow)
}

// We don't use `>>> 0`. We let the values negate. The only use of addition in
// Murmur uses the result of a multiplication, which will be converted to
// unsigned integer by our 16-bit at a time multiplication.

function fmix32 (hash) {
    hash ^= hash >>> 16
    hash = multiply(hash, 0x85ebca6b)
    hash ^= hash >>> 13
    hash = multiply(hash, 0xc2b2ae35)
    hash ^= hash >>> 16
    return hash
}

// With this, unused, function we always make sure we have an unsigned integer
// value, but it's not absolutely necessary. We're only interested in the
// integer value when we perform addition or write the value to our buffer. We
// do not do this within Murmur's mix function. I'm leaving it in place for a
// benchmark where I can gauge the cost of `>>> 0`.

function fmix32_pure (hash) {
    hash = (hash ^ (hash >>> 16)) >>> 0
    hash = multiply(hash, 0x85ebca6b)
    hash = (hash ^ (hash >>> 13)) >>> 0
    hash = multiply(hash, 0xc2b2ae35)
    hash = (hash ^ (hash >>> 16)) >>> 0
    return hash
}

function rotl32 (number, bits) {
    return ((number << bits) | (number >>> 32 - bits)) >>> 0
}

function HashMurmur332 (seed) {
    var hash = seed
    var length = 0

    function blocks (buffer, count) {
        for (var i = 0; i < count; i++) {
            var k1 =  buffer[i * 4] +
                     (buffer[i * 4 + 1] <<  8) +
                     (buffer[i * 4 + 2] << 16) +
                     (buffer[i * 4 + 3] << 24)

            k1 = multiply(k1, c1)
            k1 = rotl32(k1, 15)
            k1 = multiply(k1, c2)

            hash ^= k1
            hash = rotl32(hash, 13)
            hash = multiply(hash, 5) + 0xe6546b64
        }
        length += count * 4
    }

    function remainder (buffer, remainder) {
        var k1 = 0

        switch (remainder) {
        case 3: k1 ^= buffer[2] << 16
        case 2: k1 ^= buffer[1] << 8
        case 1: k1 ^= buffer[0]
            k1 = multiply(k1, c1)
            k1 = rotl32(k1, 15)
            k1 = multiply(k1, c2)
            hash ^= k1
        }

        hash ^= length + remainder

        hash = fmix32(hash) >>> 0

        return [ hash ]
    }

    HashBlock.call(this, blocks, remainder, 4)
}
util.inherits(HashMurmur332, HashBlock)

module.exports = HashMurmur332
