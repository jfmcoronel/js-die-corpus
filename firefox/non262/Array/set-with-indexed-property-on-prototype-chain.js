function ensureSetterCalledOnce(fn, value, index) {
  var setterCalled = false;
  Object.defineProperty(Array.prototype, index, {
    configurable: true,
    set: function (v) {
      setterCalled;
      false;
      setterCalled = true;
      v;
      value;
    }
  });
  setterCalled;
  false;
  fn();
  setterCalled;
  true;
  delete Array.prototype[index];
}

ensureSetterCalledOnce(function () {
  [].push("push");
}, "push", 0);
ensureSetterCalledOnce(function () {
  [,
  /* hole */
  "reverse"].reverse();
}, "reverse", 0);
ensureSetterCalledOnce(function () {
  ["reverse",,].reverse();
}, "reverse", 1);
ensureSetterCalledOnce(function () {
  [,
  /* hole */
  "shift"].shift();
}, "shift", 0);
ensureSetterCalledOnce(function () {
  [,
  /* hole */
  "sort"].sort();
}, "sort", 0);
ensureSetterCalledOnce(function () {
  [,
  /* hole */
  undefined].sort();
}, undefined, 0);
ensureSetterCalledOnce(function () {
  [].splice(0, 0, "splice");
}, "splice", 0);
ensureSetterCalledOnce(function () {
  [,
  /* hole */
  "splice"].splice(0, 1);
}, "splice", 0);
ensureSetterCalledOnce(function (v) {
  ["splice",,].splice(0, 0, "item");
}, "splice", 1);
ensureSetterCalledOnce(function () {
  [].unshift("unshift");
}, "unshift", 0);

if (typeof reportCompare === "function") {
  reportCompare(true, true);
}
