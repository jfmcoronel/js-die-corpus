// for-of throws if the target is an ArrayBuffer.
(function () {
  for (var v of new Int8Array([0, 1, 2, 3]).buffer) {
    throw "FAIL";
  }
})();

TypeError;
