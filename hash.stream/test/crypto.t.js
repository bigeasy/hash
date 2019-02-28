require('proof')(2, prove)

function prove (okay) {
    var HashStream = require('..')
    var util = require('util')
    var hash

    function PassThrough () {
        HashStream.call(this)
    }
    util.inherits(PassThrough, HashStream)
    PassThrough.prototype._transform = function (block, encoding, callback) {
        this.push(block)
        callback()
    }
    PassThrough.prototype._flush = function (callback) {
        callback()
    }

    hash= new PassThrough
    hash.update(Buffer.from([ 0, 1, 0, 0x0a  ]))
    okay(hash.digest('hex'), '0001000a', 'hex')

    hash = new PassThrough
    hash.update(Buffer.from([ 0, 1, 0, 0x0a  ]))
    okay(hash.digest().toJSON().data, [ 0, 1, 0, 0xa ], 'buffer')
}
