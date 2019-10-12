[![Actions Status](https://github.com/bigeasy/hash/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/hash/actions)
[![codecov](https://codecov.io/gh/bigeasy/hash/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/hash)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comparator function builder.

| What          | Where                                     |
| --- | --- |
| Discussion    | https://github.com/bigeasy/hash/issues/1  |
| Documentation | https://bigeasy.github.io/hash            |
| Source        | https://github.com/bigeasy/hash           |
| Issues        | https://github.com/bigeasy/hash/issues    |
| CI            | https://travis-ci.org/bigeasy/hash        |
| Coverage:     | https://codecov.io/gh/bigeasy/hash        |
| License:      | MIT                                       |

Install specific sub-packages.

```
npm install hash.fnv
```

A collection of pure-JavaScript non-cryptographic hash algorithms for data
veracity. Hash is an experiment in hashing for personal education and for use in
your programs.

All hash algorithms implement the Node.js `crypto.Hash` interface; they can be
used as a Streams 2 stream and via the legacy `update` and `digest` methods.

Because they implement `crypto.Hash` hash algorithms are incremental.

You also get some helpful base classes, such as

  * `OneAtATimeStream` which implements the basic byte at a time hash that emits
    a 32-bit integer,
  * `BlockStream` which buffers blocks for you and feeds them to your algorithm.

Good examples of each are `HashDJB` and `HashMurmur332` respectively.

These hashes are not cryptographic. They are not meant to be. They are meant to
be fast and useful for veracity and tables. It is part of a larger interest in
pure-JavaScript data storage.

I'll be adding a hash or two a week until I can't find any worth implementing.
All hashes will be decent hashes, legacy hashes worth revisiting to see how they
fair in JavaScript, but no toy hashes.

As a final goal, I'd like to add a command line visualization utility that will

 * display the avalanche of each hash,
 * benchmark different hashes against a set of sample data,
 * and finally, look for collisions against a particular data set.

As an ultimate goal, I'd like to understand JIT generated code well enough to
explain why some hashes are better than others in JavaScript, maybe even design
a pure-JavaScript hash that makes the most of the JIT, or maybe pave the way so
that someone else could.

If you subscribe to this Issue, I'll post when a new hash is available.

  https://github.com/bigeasy/hash/issues/1
