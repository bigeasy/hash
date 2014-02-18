#include <stdint.h>
#include <stdio.h>

#include "hash.h"

int main()
{
    int i;
    uint8_t data[256];
    uint8_t out[4 * 256];
    uint8_t final[4];
    uint32_t verify;
    hash_t hash;

    for (i = 0; i < 256; i++) {
        hash = hash_allocate(256 - i);
        data[i] = i;
        hash_update(&hash, data, i);
        hash_remainder(&hash, &out[i * 4]);
        verify = (out[i * 4] << 0) | (out[i * 4 + 1] << 8) | (out[i * 4 + 2] << 16) | (out[i * 4 + 3] << 24);
        printf("value 0x%08x\n", verify);
        hash_free(hash);
    }

    hash = hash_allocate(0);
    hash_update(&hash, out, 256 * 4);
    hash_remainder(&hash, final);
    hash_free(hash);

    verify = (final[0] << 0) | (final[1] << 8) | (final[2] << 16) | (final[3] << 24);
    printf("final 0x%08x\n", verify);
    printf("need  %s\n", needed);
}
