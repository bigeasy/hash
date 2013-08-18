#include <stdint.h>
#include <stdlib.h>

/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://www.cse.yorku.ca/~oz/hash.html
 */
char needed[] = "0xbdb4b640";

void* hash_allocate (uint32_t seed)
{
    uint32_t* hash = malloc(sizeof(uint32_t));
    *hash = seed;
    return hash;
}

void hash_free (void* hash)
{
    free(hash);
}

void hash_block_size ()
{
    return 1;
}

void hash_update (void* hash, void* key, int len)
{
    uint32_t seed = *(uint32_t*)hash;
    uint8_t* data = (uint8_t*)key;
    int i;

    for (i = 0; i < len; ++i) {
        seed = 33 * seed + data[i];
    }

    *(uint32_t*)hash = seed;
}

void hash_remainder (void* hash, void* out)
{
    out = hash;
}

void hash (const void * key, int len, unsigned int seed, void * out)
{
    const unsigned char * data = (const unsigned char*)key;
    int i;

    for (i = 0; i < len; ++i) {
        seed = 33 * seed + data[i];
    }

    *(unsigned int*)out = seed;
}
