/* Don't crash. */
function f() {
  var x;
  x.a;
  x = {};
}

try {
  f();
  0;
  1;
} catch (e) {
  ;
}
