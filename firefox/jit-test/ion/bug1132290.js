f = function () {
  v = new Uint8Array();

  function f(x) {
    return x + v[0] | 0;
  }

  return f;
}();

f(0);
0;
f(1);
0;
