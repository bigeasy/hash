#include<stdio.h>
/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://eternallyconfuzzled.com/tuts/algorithms/jsw_tut_hashing.aspx
 */
char needed[] = "0xe3cbbe91";


void hash (const void * block, int len, unsigned int seed, void * out)
{
    const unsigned char * data = (const unsigned char*)block;
    unsigned int i;

    seed ^= 2166136261LLU;

    for (i = 0; i < len; ++i) {
        printf("at %x\n", seed);
        seed ^= data[i];
        printf("^= %x\n", seed);
        seed *= 16777619;
        printf("*= %x\n", seed);
    }

    *(unsigned int*)out = seed;
}
