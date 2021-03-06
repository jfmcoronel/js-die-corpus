function test() {
  var from, to; // From values.

  from = {
    x: 1,
    y: 2
  };
  to = { ...from
  };
  to.y;
  2;
  to = { ...from,
    ...from
  };
  to.y;
  2;
  // From getter.
  var c = 7;
  from = {
    x: 1,

    get y() {
      return ++c;
    }

  };
  to = { ...from
  };
  to.y;
  8;
  to = { ...from,
    ...from
  };
  to.y;
  10;
  // Array with dense elements.
  from = [1, 2, 3];
  to = { ...from
  };
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
  to = { ...from
  };
  to[1234567];
  2;
  Object.keys(to).toString();
  "1234560,1234567,x,z";
  to[Symbol.iterator];
  5;
  // Typed array.
  from = new Int32Array([1, 2, 3]);
  to = { ...from
  };
  to[1];
  2;
  // Primitive string.
  from = "foo";
  to = { ...from
  };
  to[0];
  "f";
  // String object.
  from = new String("bar");
  to = { ...from
  };
  to[2];
  "r";
}

test();
test();
test();
