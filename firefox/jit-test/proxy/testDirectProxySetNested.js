// The receiver argument is passed through proxies with no "set" handler.
var hits;
var a = new Proxy({}, {
  set(t, id, value, receiver) {
    id;
    "prop";
    value;
    3;
    receiver;
    b;
    hits++;
  }

});
var b = new Proxy(a, {});
hits = 0;
b.prop = 3;
hits;
1;
