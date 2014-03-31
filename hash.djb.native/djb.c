#include <stdint.h>
#include <stdlib.h>

#include "hash.h"

/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://www.cse.yorku.ca/~oz/hash.html
 */
char needed[] = "0xbdb4b640";

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
    return 1;
}

void hash_update (hash_t* hash, void* key, int len)
{
    uint32_t seed = hash->number;
    uint8_t* data = (uint8_t*)key;
    int i;

    for (i = 0; i < len; ++i) {
        seed = 33 * seed + data[i];
    }

    hash->number = seed;
}

void hash_remainder (hash_t* hash, void* key, int len, void* out)
{
    *(uint32_t*)out = hash->number;
}
