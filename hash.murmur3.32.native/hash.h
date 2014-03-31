#include <stdlib.h>

typedef union {
    void* buffer;
    uint32_t number;
} hash_t;

hash_t hash_allocate (uint32_t seed);
int hash_block_size();
void hash_update(hash_t*, void* buffer, int length);
void hash_remainder(hash_t*, void* buffer, int length);
hash_t hash_hash(void* buffer, int length, uint32_t seed);
void hash_free (hash_t hash);

char needed[];
