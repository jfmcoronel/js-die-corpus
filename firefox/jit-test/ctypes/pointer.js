function test() {
  let p = ctypes.StructType("foo").ptr(0);

  (() => {
    p.increment();
  })();

  "cannot modify pointer of undefined size foo.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    p.decrement();
  })();

  "cannot modify pointer of undefined size foo.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    let a = p.contents;
  })();

  "cannot get contents of pointer of undefined size foo.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    p.contents = 1;
  })();

  "cannot set contents of pointer of undefined size foo.ptr(ctypes.UInt64(\"0x0\"))";
  let p2 = ctypes.int32_t.ptr(0);

  (() => {
    let a = p2.contents;
  })();

  "cannot read contents of null pointer ctypes.int32_t.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    p2.contents = 1;
  })();

  "cannot write contents to null pointer ctypes.int32_t.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    p2.readString();
  })();

  "cannot read contents of null pointer ctypes.int32_t.ptr(ctypes.UInt64(\"0x0\"))";

  (() => {
    ctypes.int32_t(0).readString();
  })();

  "expected PointerType or ArrayType, got ctypes.int32_t(0)";

  (() => {
    ctypes.int32_t(0).address().readString();
  })();

  /base type ctypes\.int32_t\.ptr\(ctypes\.UInt64\(\"[x0-9A-Fa-f]+\"\)\) is not an 8-bit or 16-bit integer or character type/;
}

if (typeof ctypes === "object") {
  test();
}
