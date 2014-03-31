typedef union {
    void* buffer;
    uint32_t number;
} hash_t;

extern hash_t hash_allocate (uint32_t seed);
extern void hash_free (hash_t hash);
extern int hash_block_size();
extern void hash_update(hash_t*, void* key, int len);
extern void hash_remainder(hash_t*, void* key, int len, void* out);

extern char needed[];
