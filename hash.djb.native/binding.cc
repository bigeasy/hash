#include <node.h>
#include <node_object_wrap.h>
#include <v8.h>

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

protected:
    static Handle<Value>  New(const Arguments& args);
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

    target->Set(String::New("Hash"), t->GetFunction());
}

Handle<Value> Hash::New (const Arguments& args) {
    HandleScope scope;

   return ThrowException(Exception::Error(String::New("Must give hashtype string as argument")));
}

void init(Handle<Object> target) {
  Hash::Initialize(target);
}

NODE_MODULE(binding, init);
