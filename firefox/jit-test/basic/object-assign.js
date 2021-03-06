function test() {
  var from, to; // Property changes value.

  from = {
    x: 1,
    y: 2
  };
  to = {
    set x(v) {
      from.y = 5;
    }

  };
  Object.assign(to, from);
  to.y;
  5;
  // Property becomes a getter.
  from = {
    x: 1,
    y: 2
  };
  to = {
    set x(v) {
      Object.defineProperty(from, "y", {
        get: () => 4
      });
    }

  };
  Object.assign(to, from);
  to.y;
  4;
  // Property becomes non-enumerable.
  from = {
    x: 1,
    y: 2
  };
  to = {
    set x(v) {
      Object.defineProperty(from, "y", {
        value: 2,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }

  };
  Object.assign(to, from);
  "y" in to;
  false;
  to = {};
  Object.assign(to, from);
  "y" in to;
  false;
  // Property is deleted. Should NOT get Object.prototype.toString.
  from = {
    x: 1,
    toString: 2
  };
  to = {
    set x(v) {
      delete from.toString;
    }

  };
  Object.assign(to, from);
  to.hasOwnProperty("toString");
  false;
  from = {
    toString: 2,
    x: 1
  };
  to = {
    set x(v) {
      delete from.toString;
    }

  };
  Object.assign(to, from);
  to.toString;
  2;
  from = {
    x: 1,
    toString: 2,
    y: 3
  };
  to = {
    set x(v) {
      delete from.toString;
    }

  };
  Object.assign(to, from);
  to.hasOwnProperty("toString");
  false;
  to.y;
  3;
  // New property is added.
  from = {
    x: 1,
    y: 2
  };
  to = {
    set x(v) {
      from.z = 3;
    }

  };
  Object.assign(to, from);
  "z" in to;
  false;
  // From getter.
  var c = 7;
  from = {
    x: 1,

    get y() {
      return ++c;
    }

  };
  to = {};
  Object.assign(to, from);
  Object.assign(to, from, from);
  to.y;
  10;
  // Frozen object.
  from = {
    x: 1,
    y: 2
  };
  to = {
    x: 4
  };
  Object.freeze(to);
  var ex;

  try {
    Object.assign(to, from);
  } catch (e) {
    ex = e;
  }

  ex instanceof TypeError;
  true;
  to.x;
  4;
  // Non-writable property.
  from = {
    x: 1,
    y: 2,
    z: 3
  };
  to = {};
  Object.defineProperty(to, "y", {
    value: 9,
    writable: false
  });
  ex = null;

  try {
    Object.assign(to, from);
  } catch (e) {
    ex = e;
  }

  ex instanceof TypeError;
  true;
  to.x;
  1;
  to.y;
  9;
  to.z;
  undefined;
  // Array with dense elements.
  from = [1, 2, 3];
  to = {};
  Object.assign(to, from);
  to[2];
  3;
  "length" in to;
  false;
  // Object with sparse elements and symbols.
  from = {
    x: 1,
    1234567: 2,
    1234560: 3,
    [Symbol.iterator]: 5,
    z: 3
  };
  to = {};
  Object.assign(to, from);
  to[1234567];
  2;
  Object.keys(to).toString();
  "1234560,1234567,x,z";
  to[Symbol.iterator];
  5;
  // Symbol properties need to be assigned last.
  from = {
    x: 1,
    [Symbol.iterator]: 2,
    y: 3
  };
  to = {
    set y(v) {
      throw 9;
    }

  };
  ex = null;

  try {
    Object.assign(to, from);
  } catch (e) {
    ex = e;
  }

  ex;
  9;
  to.x;
  1;
  to.hasOwnProperty(Symbol.iterator);
  false;
  // Typed array.
  from = new Int32Array([1, 2, 3]);
  to = {};
  Object.assign(to, from);
  to[1];
  2;
  // Primitive string.
  from = "foo";
  to = {};
  Object.assign(to, from);
  to[0];
  "f";
  // String object.
  from = new String("bar");
  to = {};
  Object.assign(to, from);
  to[2];
  "r";
}

test();
test();
test();
