#include<stdio.h>

extern hash (const void * key, int len, unsigned int seed, void * out) ;

extern char needed[];

int main()
{
    unsigned int i;
    unsigned char data[256];
    unsigned char out[4 * 256];
    unsigned char final[4];
    unsigned int verify;

    for (i = 0; i < 256; i++) {
        data[i] = i;
        hash(data, i, 256 - i, &out[i * 4]);
        verify = (out[i * 4] << 0) | (out[i * 4 + 1] << 8) | (out[i * 4 + 2] << 16) | (out[i * 4 + 3] << 24);
        printf("value 0x%08x\n", verify);
    }

    hash(out, 256 * 4, 0, final);

    verify = (final[0] << 0) | (final[1] << 8) | (final[2] << 16) | (final[3] << 24);
    printf("final 0x%08x\n", verify);
    printf("need  %s\n", needed);
}
