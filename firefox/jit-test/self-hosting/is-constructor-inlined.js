var g = newGlobal();
var w = g.eval("() => {}");
var v = g.eval("Array");

function f() {
  try {
    Reflect.construct(v, {}, w);
  } catch (e) {
    e instanceof TypeError;
    true;
  }
}

f();
f();
f();
