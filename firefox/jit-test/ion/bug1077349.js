function boo() {
  return foo.arguments[0];
}

function foo(a, b, c) {
  if (a == 0) {
    a ^= 4;
    return boo();
  }

  return undefined;
}

function inlined() {
  return foo.apply({}, arguments);
}

inlined(1, 2, 3);
undefined;
inlined(0, 1, 2);
4;
