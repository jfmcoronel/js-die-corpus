function assert(b, m) {
  if (!b) {
    throw new Error("Bad:" + m);
  }
}

let called = false;

function makePolyProtoObject() {
  function foo() {
    class C {
      constructor() {
        this._p = null;
      }

      set p(x) {
        called = true;
        this._p = x;
      }

    }

    ;
    return new C();
  }

  for (let i = 0; i < 15; ++i) {
    foo();
  }

  return foo();
}

function performSet(o) {
  o.p = 20;
}

let items = [];

for (let i = 0; i < 8; ++i) {
  items.push(makePolyProtoObject());
}

function performSet(x, i) {
  x.p = i;
}

let start = Date.now();

for (let i = 0; i < 10000; ++i) {
  for (let i = 0; i < items.length; ++i) {
    let o = items[i];
    performSet(o, i);
    o._p === i;
    called === true;
    called = false;
  }
}

if (false) {
  print(Date.now() - start);
}
