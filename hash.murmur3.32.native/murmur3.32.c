/*
  MurmurHash3 was written by Austin Appleby, and is placed in the public
  domain. The author hereby disclaims copyright to this source code.
 */

#include <stdlib.h>
#include "hash.h"

#if defined(_MSC_VER)

#define FORCE_INLINE	__forceinline
typedef unsigned char uint8_t;
typedef unsigned long uint32_t;
#define ROTL32(x,y)	_rotl(x,y)
#define BIG_CONSTANT(x) (x)

#else

#include <stdint.h>
#define	FORCE_INLINE inline __attribute__((always_inline))
uint32_t rotl32 ( uint32_t x, int8_t r )
{
  return (x << r) | (x >> (32 - r));
}
#define	ROTL32(x,y)	rotl32(x,y)
#define BIG_CONSTANT(x) (x##LLU)

#endif

FORCE_INLINE uint32_t getblock32 (const uint32_t * p, int i)
{
    return p[i];
}

FORCE_INLINE uint32_t fmix32 (uint32_t h)
{
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;

    return h;
}

char needed[] = "0xb0f57ee3";

hash_t hash_allocate (uint32_t seed)
{
    hash_t hash;
    hash.number = seed;
    return hash;
}

void hash_free (hash_t hash)
{
}

int hash_block_size ()
{
    return 4;
}

const uint32_t c1 = 0xcc9e2d51;
const uint32_t c2 = 0x1b873593;

void hash_update (hash_t* hash, void* buffer, int blocks)
{
    const uint8_t * data = (const uint8_t*)buffer;
    uint32_t h1 = hash->number;
    const uint32_t * block = (const uint32_t *)(data + blocks * 4);
    for(int i = -blocks; i; i++) {
        uint32_t k1 = getblock32(block, i);

        k1 *= c1;
        k1 = ROTL32(k1, 15);
        k1 *= c2;

        h1 ^= k1;
        h1 = ROTL32(h1, 13);
        h1 = h1*5 + 0xe6546b64;
    }
    hash->number = h1;
}

void hash_remainder (hash_t* hash, void* buffer, int length)
{
    const uint8_t * tail = (const uint8_t*)buffer;
    uint32_t h1 = hash->number;
    uint32_t k1 = 0;
    switch(length & 3) {
    case 3: k1 ^= tail[2] << 16;
    case 2: k1 ^= tail[1] << 8;
    case 1: k1 ^= tail[0];
            k1 *= c1;
            k1 = ROTL32(k1,15);
            k1 *= c2;
            h1 ^= k1;
    };

    h1 ^= length;
    h1 = fmix32(h1);

    hash->number = h1;
}
