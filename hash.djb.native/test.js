var assert = require('assert');
var binding = require('./build/Release/binding');
var hash = new (binding.Hash)(256-2);
var buffer = new Buffer([ 0, 1 ]);
hash.block(buffer.slice(0, 2));
console.log(hash.remainder());
