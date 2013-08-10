#include<stdio.h>

/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://www.cse.yorku.ca/~oz/hash.html
 */

void djb (const void * key, int len, unsigned int seed, void * out)
{
    const unsigned char * data = (const unsigned char*)key;
    unsigned int i;

    for (i = 0; i < len; ++i) {
        seed = 33 * seed + data[i];
    }

    *(unsigned int*)out = seed;
}

int main()
{
    unsigned int i;
    unsigned char data[256];
    unsigned char out[4 * 256];
    unsigned char final[4];
    unsigned int verify;

    for (i = 0; i < 256; i++) {
        data[i] = i;
        djb(data, i, 256 - i, &out[i * 4]);
        verify = (out[i * 4] << 0) | (out[i * 4 + 1] << 8) | (out[i * 4 + 2] << 16) | (out[i * 4 + 3] << 24);
        printf("value 0x%08X\n", verify);
    }

    djb(out, 256 * 4, 0, final);

    verify = (final[0] << 0) | (final[1] << 8) | (final[2] << 16) | (final[3] << 24);
    printf("final 0x%08X\n", verify);
    printf("need  0xBDB4B640\n");
}
