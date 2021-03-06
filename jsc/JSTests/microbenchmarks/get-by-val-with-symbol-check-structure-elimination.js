(function () {
  var a = Symbol(),
      b = Symbol(),
      c = Symbol(),
      d = Symbol(),
      e = Symbol(),
      f = Symbol(),
      g = Symbol(),
      h = Symbol(),
      i = Symbol(),
      j = Symbol(),
      k = Symbol();
  var o = {
    [a]: 1,
    [b]: 2,
    [c]: 3,
    [d]: 4,
    [e]: 5,
    [f]: 6,
    [g]: 7,
    [h]: 8,
    [i]: 9,
    [j]: 10,
    [k]: 11
  };
  var result = 0;

  for (var index = 0; index < 1000000; ++index) {
    result += o[a] ^ o[b] | o[c] ^ o[d] & o[e] ^ o[f] | o[g] ^ o[h] & o[i] ^ o[j] | o[k];
  }

  if (result != 15000000) {
    throw "Error: bad result: " + result;
  }
})();
