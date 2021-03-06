function test() {
  (() => {
    ctypes.StructType("a").define.call(1);
  })();

  "StructType.prototype.define called on incompatible object, got the number 1";

  (() => {
    ctypes.StructType("a").define.call(ctypes.int32_t);
  })();

  "StructType.prototype.define called on non-StructType, got ctypes.int32_t";
  let p = Object.getPrototypeOf(ctypes.StructType("a", [{
    "x": ctypes.int32_t
  }])());
  let o = {};
  Object.setPrototypeOf(o, p);

  (() => {
    let a = o.x;
  })();

  "StructType property getter called on incompatible object, got <<error converting value to string>>";

  (() => {
    o.x = 1;
  })();

  "StructType property setter called on incompatible object, got <<error converting value to string>>";
  o = ctypes.int32_t(0);
  Object.setPrototypeOf(o, p);

  (() => {
    let a = o.x;
  })();

  "StructType property getter called on non-StructType CData, got ctypes.int32_t(0)";

  (() => {
    o.x = 1;
  })();

  "StructType property setter called on non-StructType CData, got ctypes.int32_t(0)";

  (() => {
    ctypes.StructType("a", [])().addressOfField.call(1);
  })();

  "StructType.prototype.addressOfField called on incompatible object, got the number 1";

  (() => {
    ctypes.StructType("a", [])().addressOfField.call(ctypes.int32_t(0));
  })();

  "StructType.prototype.addressOfField called on non-StructType CData, got ctypes.int32_t(0)";
}

if (typeof ctypes === "object") {
  test();
}
