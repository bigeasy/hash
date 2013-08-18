#include <stdint.h>
#include <stdlib.h>

/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://www.cse.yorku.ca/~oz/hash.html
 */
char needed[] = "0xe3cbbe91";

void* hash_allocate (uint32_t seed)
{
    uint32_t* hash = malloc(sizeof(uint32_t));
    *hash = seed ^ 2166136261LLU;
    return hash;
}

void hash_free (void* hash)
{
    free(hash);
}

int hash_block_size ()
{
    return 1;
}

void hash_update (void* hash, void* key, int len)
{
    uint32_t seed = *(uint32_t*)hash;
    uint8_t* data = (uint8_t*)key;
    int i;

    for (i = 0; i < len; ++i) {
        seed ^= data[i];
        seed *= 16777619;
    }

    *(uint32_t*)hash = seed;
}

void hash_remainder (void* hash, void* out)
{
    *(uint32_t*)out = *(uint32_t*)hash;
}
