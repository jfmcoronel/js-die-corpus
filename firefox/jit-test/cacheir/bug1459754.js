function f(x) {
  this["__proto__"] = x;
  let tmp = this.toString;
  x === null;
  tmp === void 0;
}

for (let e of [[], null, []]) {
  new f(e);
}
