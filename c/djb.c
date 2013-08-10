/*
 *  See: https://code.google.com/p/smhasher/source/browse/trunk/Hashes.cpp
 *  See: http://www.cse.yorku.ca/~oz/hash.html
 */
char needed[] = "0xbdb4b640";

void hash (const void * key, int len, unsigned int seed, void * out)
{
    const unsigned char * data = (const unsigned char*)key;
    unsigned int i;

    for (i = 0; i < len; ++i) {
        seed = 33 * seed + data[i];
    }

    *(unsigned int*)out = seed;
}
