console.log("Tests what happens when CFG simplification leads to the elimination of a set local that had a type check, and then we branch on the variable not being null.");

function foo(o) {
  var x;

  if (o.f) {
    x = o.g;
  } else {
    x = o.h;
  }

  if (x != null) {
    return x - 1;
  } else {
    return x;
  }
}

silentTestPass = true;
noInline(foo);

for (var i = 0; i < 500; i++) {
  // i = dfgIncrement({f:foo, i:i + 1, n:100})) {
  var o = {
    f: foo
  };
  var expected;

  if (i < 450) {
    o.g = i;
    expected = "" + (i - 1);
  } else {
    o.g = null;
    expected = "null";
  }

  foo(o);
}
