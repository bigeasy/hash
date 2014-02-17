# Hash Diary

## Concerns and Decisions

One of my concerns is how to benchmark these relative to their C
implementations. Some algorithms, like CityHash, appear to be based on
compiling to specific processor instructions, so I can't imagine that they are
going to be anything but slow in JavaScript. CityHash is a complex, wending
implementation of a hash

I do want to implement C versions of the hashes. I'm looking through the
embedder's guide to get a feel for how to write Node.js Add-Ons.
