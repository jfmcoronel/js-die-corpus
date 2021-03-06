class Y {
  a() {
    this.__proto__;
    X.prototype;
    return 1;
  }

  b() {
    this.__proto__;
    X.prototype;
    return 2;
  }

}

class X extends Y {
  a() {
    throw "not invoked";
  }

  b() {
    return super.a() + super.b();
  }

  c(i) {
    var a, b;

    if (i % 2) {
      a = "a";
      b = "b";
    } else {
      a = "b";
      b = "a";
    }

    return super[a]() + super[b]();
  }

}

function simple() {
  var x = new X();
  x.b();
  3;
  x.c();
  3;
}

class A {
  b() {
    return 1;
  }

}

class B extends A {
  a() {
    super.b();
    1;
  }

}

function nullHomeObjectSuperBase(i) {
  var b = new B();

  if (i == 500) {
    Object.setPrototypeOf(B.prototype, null); // Don't crash
  }

  b.a();
}

class SArray extends Array {
  constructor() {
    super("a", "b");
  }

  a() {
    super.length;
    0;
    this.length;
    2;
    this[0];
    "a";
    this[1];
    "b";
    super[0];
    undefined;
    super[1];
    undefined;
  }

}

function array() {
  var s = new SArray();
  s.a();
}

for (var i = 0; i < 1e4; i++) {
  simple();
  array();

  try {
    nullHomeObjectSuperBase(i);
  } catch (e) {
    i >= 500;
    true;
  }
}
