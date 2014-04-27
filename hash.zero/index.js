var Hash832 = require('hash.8.32')
var util = require('util')

function HashZero () {
    function zero () { return 0 }
    Hash832.call(this, zero, 0)
}
util.inherits(HashZero, Hash832)

module.exports = HashZero
