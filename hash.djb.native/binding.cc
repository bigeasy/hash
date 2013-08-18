#include <node.h>
#include <node_object_wrap.h>
#include <v8.h>
#include <stdio.h>

extern "C" {
extern void* hash_allocate (uint32_t seed);
extern void hash_free (void* hash);
extern int hash_block_size();
extern void hash_update(void* hash, void* key, int len);
extern void hash_remainder(void* hash, void* out);
}

using namespace v8;

class Hash : public node::ObjectWrap {
public:
    static void Initialize(Handle<Object> target);

    bool HashInit (uint32_t seed) {
      return (hash_ = hash_allocate(seed)) != NULL;
    }

protected:
    static Handle<Value> New(const Arguments& args);
    static Handle<Value> HashHello(const Arguments& args);
   /*static void HashUpdate(const FunctionCallbackInfo<Value>& args);
    static void HashDigest(const FunctionCallbackInfo<Value>& args);*/

    Hash () : hash_(NULL) {
    }

    ~Hash () {
        if (hash_) hash_free(hash_);
    }

private:
    void* hash_;
};

void Hash::Initialize (Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New(New);

    t->InstanceTemplate()->SetInternalFieldCount(1);

    NODE_SET_PROTOTYPE_METHOD(t, "hello", HashHello);

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
    if (!hash->HashInit(seed)) {
        return ThrowException(Exception::Error(String::New(
          "Unable to allocate hash.")));
    }

    hash->Wrap(args.This());
    return args.This();
}

Handle<Value> Hash::HashHello (const Arguments& args) {
    HandleScope scope;
    return scope.Close(String::New("Hello, World!"));
}

void init(Handle<Object> target) {
  Hash::Initialize(target);
}

NODE_MODULE(binding, init);
