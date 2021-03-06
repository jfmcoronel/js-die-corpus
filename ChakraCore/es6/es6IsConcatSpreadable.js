//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function areEqual(a, b, msg) {
  console.log(a.length, b.length, msg);

  for (var i = 0; i < a.length; i++) {
    console.log(a[i], b[i], msg);
  }
}

function compareConcats(a, b) {
  var c = a.concat(b);
  b[Symbol.isConcatSpreadable] = false;
  var d = a.concat(b);
  console.log(b, d[a.length]);

  for (var i = 0; i < a.length; i++) {
    console.log(a[i], c[i]);
    console.log(a[i], d[i]);
  }

  for (var i = 0; i < b.length; i++) {
    console.log(b[i], c[a.length + i]);
    console.log(b[i], d[a.length][i]);
  }

  console.log(a.length + 1, d.length);
  excludeLengthCheck = false;
  delete b[Symbol.isConcatSpreadable];
}

function test1() {
  var a = [1, 2, 3];
  var b = [4, 5, 6];
  compareConcats(a, b);
}

test1();

function t2() {
  var a = [1.1, 2.2, 3.3];
  var b = [4.4, 5.5, 6.6];
  compareConcats(a, b);
}

t2();

function t3() {
  var a = ["a", "b", "c"];
  var b = ["d", "e", "f"];
  compareConcats(a, b);
}

t3();

function t4() {
  var a = [1.1, "b", 3];
  var b = [4, 5.5, "f"];
  compareConcats(a, b);
}

t4();

function t5() {
  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var b = [1, 2, 3].concat(4, 5, {
    [Symbol.isConcatSpreadable]: true,
    0: 6,
    1: 7,
    2: 8,
    "length": 3
  }, 9, 10);
  areEqual(a, b); // Test to confirm we Spread to nothing when length is not set

  var a = [1, 2, 3, 4, 5, 9, 10];
  var b = [1, 2, 3].concat(4, 5, {
    [Symbol.isConcatSpreadable]: true,
    0: 6,
    1: 7,
    2: 8
  }, 9, 10);
  areEqual(a, b);
}

t5();

function t6() {
  var a = [1.1, 2.1, 3.1];
  var b = 4.1;
  compareConcats(a, b);
  var a = [1, 2, 3];
  var b = 4;
  compareConcats(a, b);
  var a = [1, 2, 3];
  var b = "b";
  compareConcats(a, b);
  var a = [1, 2, 3];
  var b = true;
  compareConcats(a, b);
}

t6();

function t7() {
  var a = [1, 2, 3];
  var b = [4.4, 5.5, 6.6];
  var c = [Object, {}, undefined, Math.sin];

  for (var i = 0; i < c.length; i++) {
    a['constructor'] = c[i];
    compareConcats(a, b);
  }

  var o = [];

  o.constructor = function () {
    var a = new Array(100);
    a[0] = 10;
    return a;
  };

  areEqual([1, 2, 3], o.concat([1, 2, 3]));
}

t7();

function t8() {
  function test(x, y, z) {
    var a = [x],
        b = [y, z];
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable] undefined');
    b[Symbol.isConcatSpreadable] = null;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==null');
    b[Symbol.isConcatSpreadable] = false;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==false');
    b[Symbol.isConcatSpreadable] = '';
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==\'\'');
    b[Symbol.isConcatSpreadable] = 0;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==0');
    b[Symbol.isConcatSpreadable] = +0.0;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==+0.0');
    b[Symbol.isConcatSpreadable] = -0.0;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==-0.0');
    b[Symbol.isConcatSpreadable] = NaN;
    areEqual([x, [y, z]], a.concat(b), '[@@isConcatSpreadable]==NaN');
    b[Symbol.isConcatSpreadable] = undefined;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==undefined');
    b[Symbol.isConcatSpreadable] = true;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==true');
    b[Symbol.isConcatSpreadable] = 'abc';
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]=\'abc\'');
    b[Symbol.isConcatSpreadable] = 0.1;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==0.1');
    b[Symbol.isConcatSpreadable] = -0.1;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==-0.1');
    b[Symbol.isConcatSpreadable] = Symbol();
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==Symbol()');
    b[Symbol.isConcatSpreadable] = {};
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]=={}');
    delete b[Symbol.isConcatSpreadable];
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable] deleted');
  }

  test(1, 2, 3);
  test(1.1, 2.2, 3.3);
  test("a", "b", "c");
  test(1.1, "b", 3);
  test(4, 5.5, "f");
  test(undefined, NaN, function () {
    ;
  });
}

t8();

function t9() {
  function test(x, y, z) {
    var a = [x],
        b = {
      '0': y,
      '1': z,
      'length': 2
    };
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable] undefined');
    b[Symbol.isConcatSpreadable] = null;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==null');
    b[Symbol.isConcatSpreadable] = false;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==false');
    b[Symbol.isConcatSpreadable] = '';
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==\'\'');
    b[Symbol.isConcatSpreadable] = 0;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==0');
    b[Symbol.isConcatSpreadable] = +0.0;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==+0.0');
    b[Symbol.isConcatSpreadable] = -0.0;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==-0.0');
    b[Symbol.isConcatSpreadable] = NaN;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==NaN');
    b[Symbol.isConcatSpreadable] = undefined;
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable]==undefined');
    b[Symbol.isConcatSpreadable] = true;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==true');
    b[Symbol.isConcatSpreadable] = 'abc';
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==\'abc\'');
    b[Symbol.isConcatSpreadable] = 0.1;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==0.1');
    b[Symbol.isConcatSpreadable] = -0.1;
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==-0.1');
    b[Symbol.isConcatSpreadable] = Symbol();
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]==Symbol()');
    b[Symbol.isConcatSpreadable] = {};
    areEqual([x, y, z], a.concat(b), '[@@isConcatSpreadable]=={}');
    delete b[Symbol.isConcatSpreadable];
    areEqual([x, b], a.concat(b), '[@@isConcatSpreadable] deleted');
  }

  test(1, 2, 3);
  test(1.1, 2.2, 3.3);
  test("a", "b", "c");
  test(1.1, "b", 3);
  test(4, 5.5, "f");
  test(undefined, NaN, function () {
    ;
  });
}

t9();

function t10() {
  function test(x, y, z) {
    var a = [x],
        b = [y, z],
        c = [y, z];
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable] undefined');
    areEqual([x, y, z], a.concat(c), 'c[@@isConcatSpreadable] undefined');
    b[Symbol.isConcatSpreadable] = false;
    areEqual([x, [y, z]], a.concat(b), 'b[@@isConcatSpreadable]==false');
    areEqual([x, y, z], a.concat(c), 'c[@@isConcatSpreadable] undefined');
    c[Symbol.isConcatSpreadable] = false;
    areEqual([x, [y, z]], a.concat(b), 'b[@@isConcatSpreadable]==false');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    b[Symbol.isConcatSpreadable] = true;
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable]==true');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    c[Symbol.isConcatSpreadable] = true;
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable]==true');
    areEqual([x, y, z], a.concat(c), 'c[@@isConcatSpreadable]==true');
    c[Symbol.isConcatSpreadable] = false;
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable]==true');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    b[Symbol.isConcatSpreadable] = false;
    areEqual([x, [y, z]], a.concat(b), 'b[@@isConcatSpreadable]==false');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    b[Symbol.isConcatSpreadable] = undefined;
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable]==undefined');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    delete b[Symbol.isConcatSpreadable];
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable] deleted');
    areEqual([x, [y, z]], a.concat(c), 'c[@@isConcatSpreadable]==false');
    delete c[Symbol.isConcatSpreadable];
    areEqual([x, y, z], a.concat(b), 'b[@@isConcatSpreadable] deleted');
    areEqual([x, y, z], a.concat(c), 'c[@@isConcatSpreadable] deleted');
  }

  test(1, 2, 3);
  test(1.1, 2.2, 3.3);
  test("a", "b", "c");
  test(1.1, "b", 3);
  test(4, 5.5, "f");
  test(undefined, NaN, function () {
    ;
  });
}

t10();

function t11() {
  function test(a, b, c) {
    var args = function () {
      return arguments;
    }(a, b, c);

    args[Symbol.isConcatSpreadable] = true;
    areEqual([a, b, c, a, b, c], [].concat(args, args), '[' + a + ', ' + b + ', ' + c + ', ' + a + ', ' + b + ', ' + c + ']');
    Object.defineProperty(args, "length", {
      value: 6
    });
    areEqual([a, b, c, undefined, undefined, undefined], [].concat(args), '[' + a + ', ' + b + ', ' + c + ', undefined, undefined, undefined]');
  }

  test(1, 2, 3);
  test(1.1, 2.2, 3.3);
  test("a", "b", "c");
  test(1.1, "b", 3);
  test(4, 5.5, "f");
  test(undefined, NaN, function () {
    ;
  });
}

t11();

function t12() {
  class MyObj extends Object {}

  var a = new MyObj();
  a.length = 5;
  a[0] = 'a';
  a[2] = 'b';
  a[4] = 'c';
  var b = {
    length: 3,
    "0": "a",
    "1": "b",
    "2": "c"
  };

  class MyArray extends Array {}

  var c = new MyArray("a", "b", "c");
  var d = ['e', 'f', 'g'];
  a[Symbol.isConcatSpreadable] = true;
  d[Symbol.isConcatSpreadable] = false;
  areEqual(['a', undefined, 'b', undefined, 'c', b, 'a', 'b', 'c', ['e', 'f', 'g']], Array.prototype.concat.call(a, b, c, d));
}

t12();

function t13() {
  var obj = {
    "length": {
      valueOf: null,
      toString: null
    }
  };
  obj[Symbol.isConcatSpreadable] = true;

  try {
    Array.prototype.concat.call(obj);
  } catch (e) {
    ;
  }

  obj = {
    "length": {
      toString: function () {
        throw new Error('User-defined error in toString');
      },
      valueOf: null
    }
  };
  obj[Symbol.isConcatSpreadable] = true;

  try {
    Array.prototype.concat.call(obj);
  } catch (e) {
    ;
  }

  obj = {
    "length": {
      toString: function () {
        return 'string';
      },
      valueOf: null
    }
  };
  obj[Symbol.isConcatSpreadable] = true;
  areEqual([], [].concat(obj), ' toString() returns string');
  obj = {
    "length": {
      valueOf: function () {
        throw new Error('User-defined error in valueOf');
      },
      toString: null
    }
  };
  obj[Symbol.isConcatSpreadable] = true;

  try {
    Array.prototype.concat.call(obj);
  } catch (e) {
    ;
  }

  obj = {
    "length": {
      valueOf: function () {
        return 'string';
      },
      toString: null
    }
  };
  obj[Symbol.isConcatSpreadable] = true;
  areEqual([], [].concat(obj), 'toString() returns string');
  obj = {
    "length": -4294967294,
    "0": "a",
    "2": "b",
    "4": "c"
  };
  obj[Symbol.isConcatSpreadable] = true;
  areEqual([], [].concat(obj), 'ToLength clamps negative to zero');
  obj.length = -0.0;
  areEqual([], [].concat(obj), 'ToLength clamps negative to zero');
  obj.length = "-4294967294";
  areEqual([], [].concat(obj), 'ToLength clamps negative to zero');
  obj.length = "-0.0";
  areEqual([], [].concat(obj), 'ToLength clamps negative to zero');
}

t13();

function t14() {
  var obj = {};
  Object.defineProperty(obj, Symbol.isConcatSpreadable, {
    get: function () {
      throw Error('User-defined error in @@isConcatSpreadable getter');
    }
  });

  try {
    [].concat(obj);
  } catch (e) {
    ;
  }

  try {
    Array.prototype.concat.call(obj);
  } catch (e) {
    ;
  }
}

t14();

function t15() {
  function test(arr) {
    var func = function (x, y, z) {
      ;
    };

    areEqual([func], [].concat(func), 'Function object');
    func[Symbol.isConcatSpreadable] = true;
    areEqual([undefined, undefined, undefined], [].concat(func), 'func[Symbol.isConcatSpreadable] == true');
    func[Symbol.isConcatSpreadable] = false;
    areEqual([func], [].concat(func), 'func[Symbol.isConcatSpreadable] == false');
    func[Symbol.isConcatSpreadable] = true;
    areEqual([undefined, undefined, undefined], [].concat(func), 'func[Symbol.isConcatSpreadable] == true');
    func[0] = arr[0];
    func[1] = arr[1];
    func[2] = arr[2];
    areEqual(arr, [].concat(func), 'func[0..2] assigned');
    delete func[0];
    delete func[1];
    delete func[2];
    areEqual([undefined, undefined, undefined], [].concat(func), 'func[0..2] deleted');
    delete func[Symbol.isConcatSpreadable];
    areEqual([func], [].concat(func), 'func[Symbol.isConcatSpreadable] deleted');
    Function.prototype[Symbol.isConcatSpreadable] = true;
    areEqual([undefined, undefined, undefined], [].concat(func), 'Function.prototype[Symbol.isConcatSpreadable] == true');
    Function.prototype[Symbol.isConcatSpreadable] = false;
    areEqual([func], [].concat(func), 'Function.prototype[Symbol.isConcatSpreadable] == false');
    Function.prototype[0] = arr[0];
    Function.prototype[1] = arr[1];
    Function.prototype[2] = arr[2];
    areEqual([func], [].concat(func), 'Function.prototype[0..2] assigned');
    Function.prototype[Symbol.isConcatSpreadable] = true;
    areEqual(arr, [].concat(func), 'Function.prototype[Symbol.isConcatSpreadable] == true');
    delete Function.prototype[0];
    delete Function.prototype[1];
    delete Function.prototype[2];
    areEqual([undefined, undefined, undefined], [].concat(func), 'Function.prototype[0..2] deleted');
    delete Function.prototype[Symbol.isConcatSpreadable];
    areEqual([func], [].concat(func), 'Function.prototype[Symbol.isConcatSpreadable] deleted');
  }

  test([1, 2, 3]);
  test([1.1, 2.2, 3.3]);
  test(["a", "b", "c"]);
  test([2, NaN, function () {
    ;
  }]);
}

t15();

function t16() {
  function test(Type, initVal, arr) {
    var obj = new Type(initVal);
    areEqual([obj], [].concat(obj), Type.name + ' obj');
    obj[Symbol.isConcatSpreadable] = true;
    areEqual([], [].concat(obj), Type.name + ' obj[Symbol.isConcatSpreadable] == true');
    obj.length = arr.length;
    areEqual(new Array(arr.length), [].concat(obj), Type.name + ' obj[length] assigned');

    for (var i = 0; i < arr.length; i++) {
      obj[i] = arr[i];
    }

    areEqual(arr, [].concat(obj), Type.name + ' obj[0..length] assigned');
    obj[Symbol.isConcatSpreadable] = false;
    areEqual([obj], [].concat(obj), Type.name + ' obj[Symbol.isConcatSpreadable] == false');
    obj[Symbol.isConcatSpreadable] = true;
    areEqual(arr, [].concat(obj), Type.name + ' obj[Symbol.isConcatSpreadable] == true');

    for (var i = 0; i < arr.length; i++) {
      delete obj[i];
    }

    areEqual(new Array(arr.length), [].concat(obj), Type.name + ' obj[0..length] deleted');
    delete obj.length;
    areEqual([], [].concat(obj), Type.name + ' obj[length] deleted');
    delete obj[Symbol.isConcatSpreadable];
    areEqual([obj], [].concat(obj), Type.name + ' obj[Symbol.isConcatSpreadable] deleted');
    Type.prototype[Symbol.isConcatSpreadable] = true;
    areEqual([], [].concat(obj), Type.name + '.prototype[Symbol.isConcatSpreadable] == true');
    Type.prototype.length = arr.length;
    areEqual(new Array(arr.length), [].concat(obj), Type.name + '.prototype[length] assigned');

    for (var i = 0; i < arr.length; i++) {
      Type.prototype[i] = arr[i];
    }

    areEqual(arr, [].concat(obj), Type.name + '.prototype[0..length] assigned');
    Type.prototype[Symbol.isConcatSpreadable] = false;
    areEqual([obj], [].concat(obj), Type.name + '.prototype[Symbol.isConcatSpreadable] == false');
    Type.prototype[Symbol.isConcatSpreadable] = true;
    areEqual(arr, [].concat(obj), Type.name + '.prototype[Symbol.isConcatSpreadable] == true');

    for (var i = 0; i < arr.length; i++) {
      delete Type.prototype[i];
    }

    areEqual(new Array(arr.length), [].concat(obj), Type.name + '.prototype[0..length] deleted');
    delete Type.prototype.length;
    areEqual([], [].concat(obj), Type.name + '.prototype[length] deleted');
    delete Type.prototype[Symbol.isConcatSpreadable];
    areEqual([obj], [].concat(obj), Type.name + '.prototype[Symbol.isConcatSpreadable] deleted');
  }

  test(Number, 0, [1, 2, 3]);
  test(Number, -0.1, [1.1, 2.2, 3.3]);
  test(Number, NaN, ["a", "b", "c"]);
  test(Number, 321, [1, "ab", 2.2, 2, NaN, 3, function () {
    ;
  }]);
  test(Boolean, true, [1, 2, 3]);
  test(Boolean, false, [1.1, 2.2, 3.3]);
  test(Boolean, true, ["a", "b", "c"]);
  test(Boolean, false, [1, "ab", 2.2, 2, NaN, 3, function () {
    ;
  }]);
  test(RegExp, /^/, [1, 2, 3]);
  test(RegExp, /abc/, [1.1, 2.2, 3.3]);
  test(RegExp, /(\d+)/, ["a", "b", "c"]);
  test(RegExp, /^\s*\S+\s*$/, [1, "ab", 2.2, 2, NaN, 3, function () {
    ;
  }]);
}

t16();

function t17() {
  function test() {
    var s = new String("abc");
    areEqual([s], [].concat(s), "string");
    s[Symbol.isConcatSpreadable] = true;
    areEqual(['a', 'b', 'c'], [].concat(s), "string s[Symbol.isConcatSpreadable] == true");
    s[Symbol.isConcatSpreadable] = false;
    areEqual([s], [].concat(s), "string s[Symbol.isConcatSpreadable] == false");
    s[Symbol.isConcatSpreadable] = true;
    areEqual(['a', 'b', 'c'], [].concat(s), "string s[Symbol.isConcatSpreadable] == true");
    delete s[Symbol.isConcatSpreadable];
    areEqual([s], [].concat(s), "string s[Symbol.isConcatSpreadable] deleted");
    String.prototype[Symbol.isConcatSpreadable] = true;
    areEqual(['a', 'b', 'c'], [].concat(s), "string.prototype[Symbol.isConcatSpreadable] == true");
    String.prototype[Symbol.isConcatSpreadable] = false;
    areEqual([s], [].concat(s), "string.prototype[Symbol.isConcatSpreadable] == false");
    String.prototype[Symbol.isConcatSpreadable] = true;
    areEqual(['a', 'b', 'c'], [].concat(s), "string.prototype[Symbol.isConcatSpreadable] == true");
    delete String.prototype[Symbol.isConcatSpreadable];
    areEqual([s], [].concat(s), "string.prototype[Symbol.isConcatSpreadable] deleted");
  }

  test();
}

t17();

function t18() {
  // proxy revoked
  var obj = {};
  var pobj = Proxy.revocable(obj, {
    get: function (target, prop) {
      if (prop === Symbol.isConcatSpreadable) {
        pobj.revoke();
      }

      return obj[prop];
    }
  });

  try {
    [].concat(pobj.proxy);
  } catch (e) {
    ;
  }
}

t18();

function t19() {
  function test(arr, idx, elem) {
    var expected = arr.slice(0);
    expected[idx] = elem;
    Object.defineProperty(arr, Symbol.isConcatSpreadable, {
      get: function () {
        arr[idx] = elem;
        return true;
      }
    });
    areEqual(expected, [].concat(arr), 'expecting [' + expected + ']');
  }

  test([1, 2, 3], 1, 'abc');
  test([1.1, 2.2, 3.3], 0, {});
}

t19();

function t20() {
  function test(arr, expected) {
    Object.defineProperty(arr, Symbol.isConcatSpreadable, {
      get: function () {
        arr = [];
        return true;
      }
    });
    areEqual(expected, Array.prototype.concat.call(arr, arr), 'expecting [' + expected + ']');
    areEqual([], Array.prototype.concat.call(arr, arr), 'expecting []');
  }

  test([1, 2, 3], [1, 2, 3, 1, 2, 3]);
  test([1.1, 2.2, 3.3], [1.1, 2.2, 3.3, 1.1, 2.2, 3.3]);
  test(["a", "b", "c"], ["a", "b", "c", "a", "b", "c"]);
  test([1.1, "b", 3], [1.1, "b", 3, 1.1, "b", 3]);
  test([4, 5.5, "f"], [4, 5.5, "f", 4, 5.5, "f"]);

  var func = function () {
    ;
  };

  test([undefined, NaN, func], [undefined, NaN, func, undefined, NaN, func]);
}

t20();

function t21() {
  function test(arr, idx, elem) {
    var expected = arr.slice(0);
    expected[idx] = elem;
    Object.defineProperty(arr, Symbol.isConcatSpreadable, {
      get: function () {
        Object.defineProperty(arr, idx, {
          'get': function () {
            return elem;
          }
        });
        return true;
      }
    });
    areEqual(expected, Array.prototype.concat.call(arr), 'expecting [' + arr + ']');
  }

  test([1, 2, 3], 1, 'abc');
  test([1.1, 2.2, 3.3], 0, {});
}

t21();

function t22() {
  function test(a) {
    var b = {
      "0": 1,
      "1": 2,
      "length": 2
    };
    Object.defineProperty(b, Symbol.isConcatSpreadable, {
      get: function () {
        b.length = 9007199254740989;
        return true;
      }
    });

    try {
      a.concat(b);
    } catch (e) {
      ;
    }
  }

  test([1, 2, 3]);
  test([1.1, 2.2, 3.3]);
  test(["a", "b", "c"]);
  test([1.1, "b", 3]);
  test([4, 5.5, "f"]);
  test([undefined, NaN, function () {
    ;
  }]);
}

t22();

function t23() {
  var obj1 = [21];
  var arr2 = [1];
  var arr2ICSCalled = 0;
  Object.defineProperty(arr2, Symbol.isConcatSpreadable, {
    get: function () {
      arr2ICSCalled++;
      dst[2] = {};
      return false;
    }
  });
  var dst = [1, 2, 3];

  var FakeConstructor = function () {
    return dst;
  };

  FakeConstructor[Symbol.species] = FakeConstructor;
  var arr = [2, 4];
  arr.constructor = FakeConstructor;
  var out = arr.concat(arr2, obj1);
  areEqual(1, arr2ICSCalled, 'isConcatSpreadable for arr2 should be called once');
  areEqual([2, 4, [1], 21], out);
}

t23();

function t24() {
  var obj1 = [21, 22];
  var arr2 = [1, 2, 3];
  var first = true;
  var arr2ICSCalled = 0;
  Object.defineProperty(arr2, Symbol.isConcatSpreadable, {
    get: function () {
      arr2ICSCalled++;

      if (first) {
        // Changin the array to ES5 array.
        Object.defineProperty(dst, "2", {
          get: function () {
            return 1;
          }
        });
        first = false;
      }

      return true;
    }
  });
  var dst = [1, 2, 3];

  var FakeConstructor = function () {
    return dst;
  };

  FakeConstructor[Symbol.species] = FakeConstructor;
  var arr = [2, 4];
  arr.constructor = FakeConstructor;
  var out = arr.concat(arr2, obj1);
  areEqual(1, arr2ICSCalled, 'isConcatSpreadable for arr2 should be called once');
  areEqual([2, 4, 1, 2, 3, 21, 22], out, 'arr2 should be part of the spread');
}

t24();
