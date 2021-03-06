#include <node.h>
#include <node_buffer.h>
// #include <string_bytes.h>
#include <node_object_wrap.h>
#include <v8.h>
#include <stdio.h>

extern "C" {
typedef union {
    void* buffer;
    uint32_t number;
} hash_t;
extern hash_t hash_allocate (uint32_t seed);
extern void hash_free (hash_t hash);
extern int hash_block_size();
extern void hash_update(hash_t* hash, void* key, int len);
extern void hash_remainder(hash_t* hash, void* key, int len, void* out);
}

using namespace v8;
using namespace node;

class Hash : public ObjectWrap {
public:
    static void Initialize(Handle<Object> target);

protected:
    static Handle<Value> New(const Arguments& args);
    static Handle<Value> HashBlock(const Arguments& args);
    static Handle<Value> HashRemainder (const Arguments& args);

    Hash () {
        hash_.number = 0;
    }

    ~Hash () {
    }

private:
    hash_t hash_;
};

void Hash::Initialize (Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New(New);

    t->InstanceTemplate()->SetInternalFieldCount(1);

    NODE_SET_PROTOTYPE_METHOD(t, "block", HashBlock);
    NODE_SET_PROTOTYPE_METHOD(t, "remainder", HashRemainder);

    target->Set(String::New("Hash"), t->GetFunction());
}

Handle<Value> Hash::New (const Arguments& args) {
    HandleScope scope;
    uint32_t seed;

    if (args.Length() == 0 || !args[0]->IsNumber()) {
        seed = 0;
    } else {
        seed = args[0]->Uint32Value();
    }

    Hash* hash = new Hash();
    hash->hash_ = hash_allocate(seed);

    hash->Wrap(args.This());
    return args.This();
}

Handle<Value> Hash::HashBlock (const Arguments& args) {
    HandleScope scope;

    Hash *hash = ObjectWrap::Unwrap<Hash>(args.This());

    if (!Buffer::HasInstance(args[0])) {
        return ThrowException(Exception::TypeError(String::New("Not a buffer")));
    }

    hash_update(&hash->hash_, Buffer::Data(args[0]), Buffer::Length(args[0]));

    return args.This();
}

Handle<Value> Hash::HashRemainder (const Arguments& args) {
    HandleScope scope;
    uint32_t value;

    Hash *hash = ObjectWrap::Unwrap<Hash>(args.This());

    hash_remainder(&hash->hash_, Buffer::Data(args[0]), args[1]->Uint32Value(), &value);

    return scope.Close(StringBytes::Encode(reinterpret_cast<const char*>(&value), 4, BUFFER));
}

void init(Handle<Object> target) {
    Hash::Initialize(target);
}

NODE_MODULE(djb, init);
