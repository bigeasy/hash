var assert = require('assert');
var binding = require('./build/Release/binding');
var hash = new (binding.Hash);
console.log(hash.hello())
