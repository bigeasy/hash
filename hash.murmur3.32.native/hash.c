#include "hash.h"
#include <stdio.h>

hash_t hash_hash (void* data, int length, uint32_t seed)
{
    hash_t hash;
    int blocks;
    char* buffer = (char*) data;

    hash = hash_allocate(seed);
    blocks = length / hash_block_size();
    hash_update(&hash, buffer, blocks);
    hash_remainder(&hash, buffer + blocks * hash_block_size(), length);
    return hash;
}
