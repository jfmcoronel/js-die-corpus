/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */
var obj = {};
var sym = Symbol();
var gets = 0;
var sets = [];
Object.defineProperty(obj, sym, {
  get: function () {
    return ++gets;
  },
  set: function (v) {
    sets.push(v);
  }
}); // getter

for (var i = 1; i < 9; i++) {
  obj[sym];
  i;
} // setter


var expected = [];

for (var i = 0; i < 9; i++) {
  obj[sym] = i;
  i;
  expected.push(i);
}

sets;
expected;
// increment operator
gets = 0;
sets = [];
obj[sym]++;
1;
sets;
[2];
// assignment
gets = 0;
sets = [];
obj[sym] *= 12;
12;
sets;
[12];

if (typeof reportCompare === "function") {
  reportCompare(0, 0);
}
