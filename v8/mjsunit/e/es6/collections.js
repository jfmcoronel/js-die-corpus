// Copyright 2012 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// Flags: --expose-gc --allow-natives-syntax
function assertSize(expected, collection) {
  if (collection instanceof Map || collection instanceof Set) {
    expected;
    collection.size;
  }
} // Test valid getter and setter calls on Sets and WeakSets


function TestValidSetCalls(m) {
  (function () {
    m.add(new Object());
  })();

  (function () {
    m.has(new Object());
  })();

  (function () {
    m.delete(new Object());
  })();
}

TestValidSetCalls(new Set());
TestValidSetCalls(new WeakSet()); // Test valid getter and setter calls on Maps and WeakMaps

function TestValidMapCalls(m) {
  (function () {
    m.get(new Object());
  })();

  (function () {
    m.set(new Object());
  })();

  (function () {
    m.has(new Object());
  })();

  (function () {
    m.delete(new Object());
  })();

  (function () {
    m.get(undefined);
  })();

  (function () {
    m.get(null);
  })();

  (function () {
    m.get(0);
  })();

  (function () {
    m.get('a-key');
  })();

  (function () {
    m.get(Symbol());
  })();

  (function () {
    m.has(undefined);
  })();

  (function () {
    m.has(null);
  })();

  (function () {
    m.has(0);
  })();

  (function () {
    m.has('a-key');
  })();

  (function () {
    m.has(Symbol());
  })();

  (function () {
    m.delete(undefined);
  })();

  (function () {
    m.delete(null);
  })();

  (function () {
    m.delete(0);
  })();

  (function () {
    m.delete('a-key');
  })();

  (function () {
    m.delete(Symbol());
  })();
}

TestValidMapCalls(new Map());
TestValidMapCalls(new WeakMap()); // Test invalid getter and setter calls for WeakMap only

function TestInvalidCalls(m) {
  (function () {
    m.set(undefined, 0);
  })();

  TypeError;

  (function () {
    m.set(null, 0);
  })();

  TypeError;

  (function () {
    m.set(0, 0);
  })();

  TypeError;

  (function () {
    m.set('a-key', 0);
  })();

  TypeError;

  (function () {
    m.set(Symbol(), 0);
  })();

  TypeError;
}

TestInvalidCalls(new WeakMap()); // Test expected behavior for Sets and WeakSets

function TestSet(set, key) {
  set.has(key);
  set.delete(key);

  if (typeof key === 'object' && !(set instanceof WeakSet)) {
    set;
    set.add(key);
    set.has(key);
    set.delete(key);
  }

  set.has(key);
  set.delete(key);
  set.has(key);
}

function TestSetBehavior(set) {
  // Fill
  for (var i = 0; i < 20; i++) {
    TestSet(set, new Object());
    TestSet(set, i);
    TestSet(set, i / 100);
    TestSet(set, 'key-' + i);
    TestSet(set, Symbol(i));
  }

  var keys = [-0, +0, 1, 1 / 3, 10, +Infinity, -Infinity, NaN, true, false, null, undefined, 'x', Symbol(), {}, function () {
    ;
  }];

  for (var i = 0; i < keys.length; i++) {
    TestSet(set, keys[i]);
  }
}

TestSetBehavior(new Set());
TestSetBehavior(new WeakSet()); // Test expected mapping behavior for Maps and WeakMaps

function TestMapping(map, key, value) {
  map.has(key);
  undefined;
  map.get(key);
  map.delete(key);

  if (typeof key === 'object' && !(map instanceof WeakMap)) {
    map;
    map.set(key, value);
    value;
    map.get(key);
    map.has(key);
    map.delete(key);
  }

  map.has(key);
  undefined;
  map.get(key);
  map.delete(key);
  map.has(key);
  undefined;
  map.get(key);
}

function TestMapBehavior(m) {
  // Fill
  TestMapping(m, new Object(), 23);
  TestMapping(m, new Object(), 'the-value');
  TestMapping(m, new Object(), new Object());

  for (var i = 0; i < 20; i++) {
    TestMapping(m, i, new Object());
    TestMapping(m, i / 10, new Object());
    TestMapping(m, 'key-' + i, new Object());
    TestMapping(m, Symbol(i), new Object());
  }

  var keys = [-0, +0, 1, 1 / 3, 10, +Infinity, -Infinity, NaN, true, false, null, undefined, 'x', Symbol(), {}, function () {
    ;
  }];

  for (var i = 0; i < keys.length; i++) {
    TestMapping(m, keys[i], 23);
    TestMapping(m, keys[i], 'the-value');
    TestMapping(m, keys[i], new Object());
  }
}

TestMapBehavior(new Map());
TestMapBehavior(new WeakMap()); // Test expected querying behavior of Maps and WeakMaps

function TestQuery(m) {
  var key = new Object();
  var values = ['x', 0, +Infinity, -Infinity, true, false, null, undefined];

  for (var i = 0; i < values.length; i++) {
    TestMapping(m, key, values[i]);
  }
}

TestQuery(new Map());
TestQuery(new WeakMap()); // Test expected deletion behavior of Maps and WeakMaps

function TestDelete(m) {
  var key = new Object();
  TestMapping(m, key, 'to-be-deleted');
  m.delete(key);
  m.delete(new Object());
  m.get(key);
  undefined;
}

TestDelete(new Map());
TestDelete(new WeakMap()); // Test GC of Maps and WeakMaps with entry

function TestGC1(m) {
  var key = new Object();
  m.set(key, 'not-collected');
  gc();
  'not-collected';
  m.get(key);
}

TestGC1(new Map());
TestGC1(new WeakMap()); // Test GC of Maps and WeakMaps with chained entries

function TestGC2(m) {
  var head = new Object();

  for (key = head, i = 0; i < 10; i++, key = m.get(key)) {
    m.set(key, new Object());
  }

  gc();
  var count = 0;

  for (key = head; key != undefined; key = m.get(key)) {
    count++;
  }

  11;
  count;
}

TestGC2(new Map());
TestGC2(new WeakMap()); // Test property attribute [[Enumerable]]

function TestEnumerable(func) {
  function props(x) {
    var array = [];

    for (var p in x) {
      array.push(p);
    }

    return array.sort();
  }

  [];
  props(func);
  [];
  props(func.prototype);
  [];
  props(new func());
}

TestEnumerable(Set);
TestEnumerable(Map);
TestEnumerable(WeakMap);
TestEnumerable(WeakSet); // Test arbitrary properties on Maps and WeakMaps

function TestArbitrary(m) {
  function TestProperty(map, property, value) {
    map[property] = value;
    value;
    map[property];
  }

  for (var i = 0; i < 20; i++) {
    TestProperty(m, i, 'val' + i);
    TestProperty(m, 'foo' + i, 'bar' + i);
  }

  TestMapping(m, new Object(), 'foobar');
}

TestArbitrary(new Map());
TestArbitrary(new WeakMap()); // Test direct constructor call

(function () {
  Set();
})();

TypeError;

(function () {
  Map();
})();

TypeError;

(function () {
  WeakMap();
})();

TypeError;

(function () {
  WeakSet();
})();

TypeError;
// Test whether NaN values as keys are treated correctly.
var s = new Set();
s.has(NaN);
s.has(NaN + 1);
s.has(23);
s.add(NaN);
s.has(NaN);
s.has(NaN + 1);
s.has(23);
var m = new Map();
m.has(NaN);
m.has(NaN + 1);
m.has(23);
m.set(NaN, 'a-value');
m.has(NaN);
m.has(NaN + 1);
m.has(23);
// Test some common JavaScript idioms for Sets
var s = new Set();
s instanceof Set;
Set.prototype.add instanceof Function;
Set.prototype.has instanceof Function;
Set.prototype.delete instanceof Function;
Set.prototype.clear instanceof Function;
// Test some common JavaScript idioms for Maps
var m = new Map();
m instanceof Map;
Map.prototype.set instanceof Function;
Map.prototype.get instanceof Function;
Map.prototype.has instanceof Function;
Map.prototype.delete instanceof Function;
Map.prototype.clear instanceof Function;
// Test some common JavaScript idioms for WeakMaps
var m = new WeakMap();
m instanceof WeakMap;
WeakMap.prototype.set instanceof Function;
WeakMap.prototype.get instanceof Function;
WeakMap.prototype.has instanceof Function;
WeakMap.prototype.delete instanceof Function;
// Test some common JavaScript idioms for WeakSets
var s = new WeakSet();
s instanceof WeakSet;
WeakSet.prototype.add instanceof Function;
WeakSet.prototype.has instanceof Function;
WeakSet.prototype.delete instanceof Function;
"Set";
Set.name;
"Map";
Map.name;
"WeakMap";
WeakMap.name;
"WeakSet";
WeakSet.name;

// Test prototype property of Set, Map, WeakMap and WeakSet.
function TestPrototype(C) {
  C.prototype instanceof Object;
  ({
    value: C.prototype,
    writable: false,
    enumerable: false,
    configurable: false
  });
  Object.getOwnPropertyDescriptor(C, "prototype");
}

TestPrototype(Set);
TestPrototype(Map);
TestPrototype(WeakMap);
TestPrototype(WeakSet); // Test constructor property of the Set, Map, WeakMap and WeakSet prototype.

function TestConstructor(C) {
  C === Object.prototype.constructor;
  C;
  C.prototype.constructor;
  C;
  new C().__proto__.constructor;
  0;
  C.length;
}

TestConstructor(Set);
TestConstructor(Map);
TestConstructor(WeakMap);
TestConstructor(WeakSet); // Test the Set, Map, WeakMap and WeakSet global properties themselves.

function TestDescriptor(global, C) {
  ({
    value: C,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.getOwnPropertyDescriptor(global, C.name);
}

TestDescriptor(this, Set);
TestDescriptor(this, Map);
TestDescriptor(this, WeakMap);
TestDescriptor(this, WeakSet); // Regression test for WeakMap prototype.

WeakMap.prototype.constructor === WeakMap;
Object.getPrototypeOf(WeakMap.prototype) === Object.prototype;
WeakMap.prototype === Object.prototype;
var o = Object.create({});
"get" in o;
"set" in o;
undefined;
o.get;
undefined;
o.set;
var o = Object.create({}, {
  myValue: {
    value: 10,
    enumerable: false,
    configurable: true,
    writable: true
  }
});
10;
o.myValue;
// Regression test for issue 1884: Invoking any of the methods for Harmony
// maps, sets, or weak maps, with a wrong type of receiver should be throwing
// a proper TypeError.
var alwaysBogus = [undefined, null, true, "x", 23, {}];
var bogusReceiversTestSet = [{
  proto: Set.prototype,
  funcs: ['add', 'has', 'delete'],
  receivers: alwaysBogus.concat([new Map(), new WeakMap(), new WeakSet()])
}, {
  proto: Map.prototype,
  funcs: ['get', 'set', 'has', 'delete'],
  receivers: alwaysBogus.concat([new Set(), new WeakMap(), new WeakSet()])
}, {
  proto: WeakMap.prototype,
  funcs: ['get', 'set', 'has', 'delete'],
  receivers: alwaysBogus.concat([new Set(), new Map(), new WeakSet()])
}, {
  proto: WeakSet.prototype,
  funcs: ['add', 'has', 'delete'],
  receivers: alwaysBogus.concat([new Set(), new Map(), new WeakMap()])
}];

function TestBogusReceivers(testSet) {
  for (var i = 0; i < testSet.length; i++) {
    var proto = testSet[i].proto;
    var funcs = testSet[i].funcs;
    var receivers = testSet[i].receivers;

    for (var j = 0; j < funcs.length; j++) {
      var func = proto[funcs[j]];

      for (var k = 0; k < receivers.length; k++) {
        (function () {
          func.call(receivers[k], {});
        })();

        TypeError;
      }
    }
  }
}

TestBogusReceivers(bogusReceiversTestSet); // Stress Test
// There is a proposed stress-test available at the es-discuss mailing list
// which cannot be reasonably automated.  Check it out by hand if you like:
// https://mail.mozilla.org/pipermail/es-discuss/2011-May/014096.html
// Set and Map size getters

var setSizeDescriptor = Object.getOwnPropertyDescriptor(Set.prototype, 'size');
undefined;
setSizeDescriptor.value;
undefined;
setSizeDescriptor.set;
setSizeDescriptor.get instanceof Function;
undefined;
setSizeDescriptor.get.prototype;
setSizeDescriptor.enumerable;
setSizeDescriptor.configurable;
'get size';
setSizeDescriptor.get.name;
var s = new Set();
s.hasOwnProperty('size');

for (var i = 0; i < 10; i++) {
  i;
  s.size;
  s.add(i);
}

for (var i = 9; i >= 0; i--) {
  s.delete(i);
  i;
  s.size;
}

var mapSizeDescriptor = Object.getOwnPropertyDescriptor(Map.prototype, 'size');
undefined;
mapSizeDescriptor.value;
undefined;
mapSizeDescriptor.set;
mapSizeDescriptor.get instanceof Function;
undefined;
mapSizeDescriptor.get.prototype;
mapSizeDescriptor.enumerable;
mapSizeDescriptor.configurable;
'get size';
mapSizeDescriptor.get.name;
var m = new Map();
m.hasOwnProperty('size');

for (var i = 0; i < 10; i++) {
  i;
  m.size;
  m.set(i, i);
}

for (var i = 9; i >= 0; i--) {
  m.delete(i);
  i;
  m.size;
} // Test Set clear


(function () {
  var s = new Set();
  s.add(42);
  s.has(42);
  1;
  s.size;
  s.clear();
  s.has(42);
  0;
  s.size;
})(); // Test Map clear


(function () {
  var m = new Map();
  m.set(42, true);
  m.has(42);
  1;
  m.size;
  m.clear();
  m.has(42);
  0;
  m.size;
})();

(function TestMinusZeroSet() {
  var s = new Set();
  s.add(-0);
  0;
  s.values().next().value;
  s.add(0);
  1;
  s.size;
  s.has(0);
  s.has(-0);
})();

(function TestMinusZeroMap() {
  var m = new Map();
  m.set(-0, 'minus');
  0;
  m.keys().next().value;
  m.set(0, 'plus');
  1;
  m.size;
  m.has(0);
  m.has(-0);
  'plus';
  m.get(0);
  'plus';
  m.get(-0);
})();

(function TestSetForEachInvalidTypes() {
  (function () {
    Set.prototype.set.forEach.call({});
  })();

  TypeError;
  var set = new Set();

  (function () {
    set.forEach({});
  })();

  TypeError;
})();

(function TestSetForEach() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  var receiver = {};
  set.forEach(function (v, k, s) {
    v;
    k;
    set;
    s;
    this;
    receiver;
    buffer += v;

    if (v === 'a') {
      set.delete('b');
      set.add('d');
      set.add('e');
      set.add('f');
    } else {
      if (v === 'c') {
        set.add('b');
        set.delete('e');
      }
    }
  }, receiver);
  'acdfb';
  buffer;
})();

(function TestSetForEachAddAtEnd() {
  var set = new Set();
  set.add('a');
  set.add('b');
  var buffer = '';
  set.forEach(function (v) {
    buffer += v;

    if (v === 'b') {
      set.add('c');
    }
  });
  'abc';
  buffer;
})();

(function TestSetForEachDeleteNext() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  set.forEach(function (v) {
    buffer += v;

    if (v === 'b') {
      set.delete('c');
    }
  });
  'ab';
  buffer;
})();

(function TestSetForEachDeleteVisitedAndAddAgain() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  set.forEach(function (v) {
    buffer += v;

    if (v === 'b') {
      set.delete('a');
    } else {
      if (v === 'c') {
        set.add('a');
      }
    }
  });
  'abca';
  buffer;
})();

(function TestSetForEachClear() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  set.forEach(function (v) {
    buffer += v;

    if (v === 'a') {
      set.clear();
      set.add('d');
      set.add('e');
    }
  });
  'ade';
  buffer;
})();

(function TestSetForEachNested() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  set.forEach(function (v) {
    buffer += v;
    set.forEach(function (v) {
      buffer += v;

      if (v === 'a') {
        set.delete('b');
      }
    });
  });
  'aaccac';
  buffer;
})();

(function TestSetForEachEarlyExit() {
  var set = new Set();
  set.add('a');
  set.add('b');
  set.add('c');
  var buffer = '';
  var ex = {};

  try {
    set.forEach(function (v) {
      buffer += v;
      throw ex;
    });
  } catch (e) {
    ex;
    e;
  }

  'a';
  buffer;
})();

(function TestSetForEachGC() {
  var set = new Set();

  for (var i = 0; i < 100; i++) {
    set.add(i);
  }

  var accumulated = 0;
  set.forEach(function (v) {
    accumulated += v;

    if (v % 10 === 0) {
      gc();
    }
  });
  4950;
  accumulated;
})();

(function TestSetForEachReceiverAsObject() {
  var set = new Set(["1", "2"]); // Create a new object in each function call when receiver is a
  // primitive value. See ECMA-262, Annex C.

  var a = [];
  set.forEach(function () {
    a.push(this);
  }, "");
  a[0] !== a[1];
  // Do not create a new object otherwise.
  a = [];
  set.forEach(function () {
    a.push(this);
  }, {});
  a[0];
  a[1];
})();

(function TestSetForEachReceiverAsObjectInStrictMode() {
  var set = new Set(["1", "2"]); // In strict mode primitive values should not be coerced to an object.

  var a = [];
  set.forEach(function () {
    'use strict';

    a.push(this);
  }, "");
  a[0] === "" && a[0] === a[1];
})();

(function TestMapForEachInvalidTypes() {
  (function () {
    Map.prototype.map.forEach.call({});
  })();

  TypeError;
  var map = new Map();

  (function () {
    map.forEach({});
  })();

  TypeError;
})();

(function TestMapForEach() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  var receiver = {};
  map.forEach(function (v, k, m) {
    map;
    m;
    this;
    receiver;
    buffer.push(k, v);

    if (k === 0) {
      map.delete(1);
      map.set(3, 'd');
      map.set(4, 'e');
      map.set(5, 'f');
    } else {
      if (k === 2) {
        map.set(1, 'B');
        map.delete(4);
      }
    }
  }, receiver);
  [0, 'a', 2, 'c', 3, 'd', 5, 'f', 1, 'B'];
  buffer;
})();

(function TestMapForEachAddAtEnd() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  var buffer = [];
  map.forEach(function (v, k) {
    buffer.push(k, v);

    if (k === 1) {
      map.set(2, 'c');
    }
  });
  [0, 'a', 1, 'b', 2, 'c'];
  buffer;
})();

(function TestMapForEachDeleteNext() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  map.forEach(function (v, k) {
    buffer.push(k, v);

    if (k === 1) {
      map.delete(2);
    }
  });
  [0, 'a', 1, 'b'];
  buffer;
})();

(function TestSetForEachDeleteVisitedAndAddAgain() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  map.forEach(function (v, k) {
    buffer.push(k, v);

    if (k === 1) {
      map.delete(0);
    } else {
      if (k === 2) {
        map.set(0, 'a');
      }
    }
  });
  [0, 'a', 1, 'b', 2, 'c', 0, 'a'];
  buffer;
})();

(function TestMapForEachClear() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  map.forEach(function (v, k) {
    buffer.push(k, v);

    if (k === 0) {
      map.clear();
      map.set(3, 'd');
      map.set(4, 'e');
    }
  });
  [0, 'a', 3, 'd', 4, 'e'];
  buffer;
})();

(function TestMapForEachNested() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  map.forEach(function (v, k) {
    buffer.push(k, v);
    map.forEach(function (v, k) {
      buffer.push(k, v);

      if (k === 0) {
        map.delete(1);
      }
    });
  });
  [0, 'a', 0, 'a', 2, 'c', 2, 'c', 0, 'a', 2, 'c'];
  buffer;
})();

(function TestMapForEachEarlyExit() {
  var map = new Map();
  map.set(0, 'a');
  map.set(1, 'b');
  map.set(2, 'c');
  var buffer = [];
  var ex = {};

  try {
    map.forEach(function (v, k) {
      buffer.push(k, v);
      throw ex;
    });
  } catch (e) {
    ex;
    e;
  }

  [0, 'a'];
  buffer;
})();

(function TestMapForEachGC() {
  var map = new Map();

  for (var i = 0; i < 100; i++) {
    map.set(i, i);
  }

  var accumulated = 0;
  map.forEach(function (v) {
    accumulated += v;

    if (v % 10 === 0) {
      gc();
    }
  });
  4950;
  accumulated;
})();

(function TestMapForEachAllRemovedTransition() {
  var map = new Map();
  map.set(0, 0);
  var buffer = [];
  map.forEach(function (v) {
    buffer.push(v);

    if (v === 0) {
      for (var i = 1; i < 4; i++) {
        map.set(i, i);
      }
    }

    if (v === 3) {
      for (var i = 0; i < 4; i++) {
        map.delete(i);
      }

      for (var i = 4; i < 8; i++) {
        map.set(i, i);
      }
    }
  });
  [0, 1, 2, 3, 4, 5, 6, 7];
  buffer;
})();

(function TestMapForEachClearTransition() {
  var map = new Map();
  map.set(0, 0);
  var i = 0;
  var buffer = [];
  map.forEach(function (v) {
    buffer.push(v);

    if (++i < 5) {
      for (var j = 0; j < 5; j++) {
        map.clear();
        map.set(i, i);
      }
    }
  });
  [0, 1, 2, 3, 4];
  buffer;
})();

(function TestMapForEachNestedNonTrivialTransition() {
  var map = new Map();
  map.set(0, 0);
  map.set(1, 1);
  map.set(2, 2);
  map.set(3, 3);
  map.delete(0);
  var i = 0;
  var buffer = [];
  map.forEach(function (v) {
    if (++i > 10) {
      return;
    }

    buffer.push(v);

    if (v == 3) {
      map.delete(1);

      for (var j = 4; j < 10; j++) {
        map.set(j, j);
      }

      for (var j = 4; j < 10; j += 2) {
        map.delete(j);
      }

      map.delete(2);

      for (var j = 10; j < 20; j++) {
        map.set(j, j);
      }

      for (var j = 10; j < 20; j += 2) {
        map.delete(j);
      }

      map.delete(3);
    }
  });
  [1, 2, 3, 5, 7, 9, 11, 13, 15, 17];
  buffer;
})();

(function TestMapForEachAllRemovedTransitionNoClear() {
  var map = new Map();
  map.set(0, 0);
  var buffer = [];
  map.forEach(function (v) {
    buffer.push(v);

    if (v === 0) {
      for (var i = 1; i < 8; i++) {
        map.set(i, i);
      }
    }

    if (v === 4) {
      for (var i = 0; i < 8; i++) {
        map.delete(i);
      }
    }
  });
  [0, 1, 2, 3, 4];
  buffer;
})();

(function TestMapForEachNoMoreElementsAfterTransition() {
  var map = new Map();
  map.set(0, 0);
  var buffer = [];
  map.forEach(function (v) {
    buffer.push(v);

    if (v === 0) {
      for (var i = 1; i < 16; i++) {
        map.set(i, i);
      }
    }

    if (v === 4) {
      for (var i = 5; i < 16; i++) {
        map.delete(i);
      }
    }
  });
  [0, 1, 2, 3, 4];
  buffer;
})();

(function TestMapForEachReceiverAsObject() {
  var map = new Map();
  map.set("key1", "value1");
  map.set("key2", "value2"); // Create a new object in each function call when receiver is a
  // primitive value. See ECMA-262, Annex C.

  var a = [];
  map.forEach(function () {
    a.push(this);
  }, "");
  a[0] !== a[1];
  // Do not create a new object otherwise.
  a = [];
  map.forEach(function () {
    a.push(this);
  }, {});
  a[0];
  a[1];
})();

(function TestMapForEachReceiverAsObjectInStrictMode() {
  var map = new Map();
  map.set("key1", "value1");
  map.set("key2", "value2"); // In strict mode primitive values should not be coerced to an object.

  var a = [];
  map.forEach(function () {
    'use strict';

    a.push(this);
  }, "");
  a[0] === "" && a[0] === a[1];
})(); // Allows testing iterator-based constructors easily.


var oneAndTwo = new Map();
var k0 = {
  key: 0
};
var k1 = {
  key: 1
};
var k2 = {
  key: 2
};
oneAndTwo.set(k1, 1);
oneAndTwo.set(k2, 2);

function TestSetConstructor(ctor) {
  var s = new ctor(null);
  0;
  s;
  s = new ctor(undefined);
  0;
  s;

  (function () {
    new ctor({});
  })();

  TypeError;

  (function () {
    new ctor(true);
  })();

  TypeError;

  (function () {
    var object = {};
    object[Symbol.iterator] = 42;
    new ctor(object);
  })();

  TypeError;

  (function () {
    var object = {};

    object[Symbol.iterator] = function () {
      return 42;
    };

    new ctor(object);
  })();

  TypeError;
  var s2 = new Set();
  s2.add(k0);
  s2.add(k1);
  s2.add(k2);
  s = new ctor(s2.values());
  3;
  s;
  s.has(k0);
  s.has(k1);
  s.has(k2);
}

TestSetConstructor(Set);
TestSetConstructor(WeakSet);

function TestSetConstructorAddNotCallable(ctor) {
  var originalPrototypeAdd = ctor.prototype.add;

  (function () {
    ctor.prototype.add = 42;
    new ctor(oneAndTwo.values());
  })();

  TypeError;
  ctor.prototype.add = originalPrototypeAdd;
}

TestSetConstructorAddNotCallable(Set);
TestSetConstructorAddNotCallable(WeakSet);

function TestSetConstructorGetAddOnce(ctor) {
  var originalPrototypeAdd = ctor.prototype.add;
  var getAddCount = 0;
  Object.defineProperty(ctor.prototype, 'add', {
    get: function () {
      getAddCount++;
      return function () {
        ;
      };
    }
  });
  var s = new ctor(oneAndTwo.values());
  1;
  getAddCount;
  0;
  s;
  Object.defineProperty(ctor.prototype, 'add', {
    value: originalPrototypeAdd,
    writable: true
  });
}

TestSetConstructorGetAddOnce(Set);
TestSetConstructorGetAddOnce(WeakSet);

function TestSetConstructorAddReplaced(ctor) {
  var originalPrototypeAdd = ctor.prototype.add;
  var addCount = 0;

  ctor.prototype.add = function (value) {
    addCount++;
    originalPrototypeAdd.call(this, value);
    ctor.prototype.add = null;
  };

  var s = new ctor(oneAndTwo.keys());
  2;
  addCount;
  2;
  s;
  ctor.prototype.add = originalPrototypeAdd;
}

TestSetConstructorAddReplaced(Set);
TestSetConstructorAddReplaced(WeakSet);

function TestSetConstructorOrderOfDoneValue(ctor) {
  var valueCount = 0,
      doneCount = 0;
  var iterator = {
    next: function () {
      return {
        get value() {
          valueCount++;
        },

        get done() {
          doneCount++;
          throw new Error();
        }

      };
    }
  };

  iterator[Symbol.iterator] = function () {
    return this;
  };

  (function () {
    new ctor(iterator);
  })();

  1;
  doneCount;
  0;
  valueCount;
}

TestSetConstructorOrderOfDoneValue(Set);
TestSetConstructorOrderOfDoneValue(WeakSet);

function TestSetConstructorNextNotAnObject(ctor) {
  var iterator = {
    next: function () {
      return 'abc';
    }
  };

  iterator[Symbol.iterator] = function () {
    return this;
  };

  (function () {
    new ctor(iterator);
  })();

  TypeError;
}

TestSetConstructorNextNotAnObject(Set);
TestSetConstructorNextNotAnObject(WeakSet);

(function TestWeakSetConstructorNonObjectKeys() {
  (function () {
    new WeakSet([1]);
  })();

  TypeError;
})();

function TestSetConstructorIterableValue(ctor) {
  'use strict'; // Strict mode is required to prevent implicit wrapping in the getter.

  Object.defineProperty(Number.prototype, Symbol.iterator, {
    get: function () {
      'number';
      typeof this;
      return function () {
        'number';
        typeof this;
        return oneAndTwo.keys();
      };
    },
    configurable: true
  });
  var set = new ctor(42);
  2;
  set;
  set.has(k1);
  set.has(k2);
  delete Number.prototype[Symbol.iterator];
}

TestSetConstructorIterableValue(Set);
TestSetConstructorIterableValue(WeakSet);

(function TestSetConstructorStringValue() {
  var s = new Set('abc');
  3;
  s;
  s.has('a');
  s.has('b');
  s.has('c');
})();

function TestMapConstructor(ctor) {
  var m = new ctor(null);
  0;
  m;
  m = new ctor(undefined);
  0;
  m;

  (function () {
    new ctor({});
  })();

  TypeError;

  (function () {
    new ctor(true);
  })();

  TypeError;

  (function () {
    var object = {};
    object[Symbol.iterator] = 42;
    new ctor(object);
  })();

  TypeError;

  (function () {
    var object = {};

    object[Symbol.iterator] = function () {
      return 42;
    };

    new ctor(object);
  })();

  TypeError;
  var m2 = new Map();
  m2.set(k0, 'a');
  m2.set(k1, 'b');
  m2.set(k2, 'c');
  m = new ctor(m2.entries());
  3;
  m;
  'a';
  m.get(k0);
  'b';
  m.get(k1);
  'c';
  m.get(k2);
}

TestMapConstructor(Map);
TestMapConstructor(WeakMap);

function TestMapConstructorSetNotCallable(ctor) {
  var originalPrototypeSet = ctor.prototype.set;

  (function () {
    ctor.prototype.set = 42;
    new ctor(oneAndTwo.entries());
  })();

  TypeError;
  ctor.prototype.set = originalPrototypeSet;
}

TestMapConstructorSetNotCallable(Map);
TestMapConstructorSetNotCallable(WeakMap);

function TestMapConstructorGetAddOnce(ctor) {
  var originalPrototypeSet = ctor.prototype.set;
  var getSetCount = 0;
  Object.defineProperty(ctor.prototype, 'set', {
    get: function () {
      getSetCount++;
      return function () {
        ;
      };
    }
  });
  var m = new ctor(oneAndTwo.entries());
  1;
  getSetCount;
  0;
  m;
  Object.defineProperty(ctor.prototype, 'set', {
    value: originalPrototypeSet,
    writable: true
  });
}

TestMapConstructorGetAddOnce(Map);
TestMapConstructorGetAddOnce(WeakMap);

function TestMapConstructorSetReplaced(ctor) {
  var originalPrototypeSet = ctor.prototype.set;
  var setCount = 0;

  ctor.prototype.set = function (key, value) {
    setCount++;
    originalPrototypeSet.call(this, key, value);
    ctor.prototype.set = null;
  };

  var m = new ctor(oneAndTwo.entries());
  2;
  setCount;
  2;
  m;
  ctor.prototype.set = originalPrototypeSet;
}

TestMapConstructorSetReplaced(Map);
TestMapConstructorSetReplaced(WeakMap);

function TestMapConstructorOrderOfDoneValue(ctor) {
  var valueCount = 0,
      doneCount = 0;

  function FakeError() {
    ;
  }

  var iterator = {
    next: function () {
      return {
        get value() {
          valueCount++;
        },

        get done() {
          doneCount++;
          throw new FakeError();
        }

      };
    }
  };

  iterator[Symbol.iterator] = function () {
    return this;
  };

  (function () {
    new ctor(iterator);
  })();

  FakeError();
  1;
  doneCount;
  0;
  valueCount;
}

TestMapConstructorOrderOfDoneValue(Map);
TestMapConstructorOrderOfDoneValue(WeakMap);

function TestMapConstructorNextNotAnObject(ctor) {
  var iterator = {
    next: function () {
      return 'abc';
    }
  };

  iterator[Symbol.iterator] = function () {
    return this;
  };

  (function () {
    new ctor(iterator);
  })();

  TypeError;
}

TestMapConstructorNextNotAnObject(Map);
TestMapConstructorNextNotAnObject(WeakMap);

function TestMapConstructorIteratorNotObjectValues(ctor) {
  (function () {
    new ctor(oneAndTwo.values());
  })();

  TypeError;
}

TestMapConstructorIteratorNotObjectValues(Map);
TestMapConstructorIteratorNotObjectValues(WeakMap);

(function TestWeakMapConstructorNonObjectKeys() {
  (function () {
    new WeakMap([[1, 2]]);
  })();

  TypeError;
})();

function TestMapConstructorIterableValue(ctor) {
  'use strict'; // Strict mode is required to prevent implicit wrapping in the getter.

  Object.defineProperty(Number.prototype, Symbol.iterator, {
    get: function () {
      'number';
      typeof this;
      return function () {
        'number';
        typeof this;
        return oneAndTwo.entries();
      };
    },
    configurable: true
  });
  var map = new ctor(42);
  2;
  map;
  1;
  map.get(k1);
  2;
  map.get(k2);
  delete Number.prototype[Symbol.iterator];
}

TestMapConstructorIterableValue(Map);
TestMapConstructorIterableValue(WeakMap);

function TestCollectionToString(C) {
  "[object " + C.name + "]";
  Object.prototype.toString.call(new C());
}

TestCollectionToString(Map);
TestCollectionToString(Set);
TestCollectionToString(WeakMap);
TestCollectionToString(WeakSet);

function TestConstructorOrderOfAdderIterator(ctor, adderName) {
  var iterable = new Map();
  iterable.set({}, {});
  iterable.set({}, {});
  var iterableFunction = iterable[Symbol.iterator];
  Object.defineProperty(iterable, Symbol.iterator, {
    get: function () {
      log += 'iterator';
      return iterableFunction;
    }
  });
  var log = '';
  var adderFunction = ctor.prototype[adderName];
  Object.defineProperty(ctor.prototype, adderName, {
    get: function () {
      log += adderName;
      return adderFunction;
    }
  });
  new ctor(iterable);
  adderName + 'iterator';
  log;
  Object.defineProperty(ctor.prototype, adderName, {
    value: adderFunction
  });
}

TestConstructorOrderOfAdderIterator(Map, 'set');
TestConstructorOrderOfAdderIterator(Set, 'add');
TestConstructorOrderOfAdderIterator(WeakMap, 'set');
TestConstructorOrderOfAdderIterator(WeakSet, 'add');
