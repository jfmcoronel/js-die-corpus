/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
var BUGNUMBER = 1069063;
var summary = "Implement Array.prototype.includes";
print(BUGNUMBER + ": " + summary);
typeof [].includes;
"function";
[].includes.length;
1;
[1, 2, 3].includes(2);
[1,, 2].includes(2);
[1, 2, 3].includes(2, 1);
[1, 2, 3].includes(2, -2);
[1, 2, 3].includes(2, -100);
[Object, Function, Array].includes(Function);
[-0].includes(0);
[NaN].includes(NaN);
[,].includes();
staticIncludes("123", "2");
staticIncludes({
  length: 3,
  1: 2
}, 2);
staticIncludes({
  length: 3,
  1: 2,

  get 3() {
    throw "";
  }

}, 2);
staticIncludes({
  length: 3,

  get 1() {
    return 2;
  }

}, 2);
staticIncludes({
  __proto__: {
    1: 2
  },
  length: 3
}, 2);
staticIncludes(new Proxy([1], {
  get() {
    return 2;
  }

}), 2);
[1, 2, 3].includes("2");
[1, 2, 3].includes(2, 2);
[1, 2, 3].includes(2, -1);
[undefined].includes(NaN);
[{}].includes({});
staticIncludes({
  length: 3,
  1: 2
}, 2, 2);
staticIncludes({
  length: 3,

  get 0() {
    delete this[1];
  },

  1: 2
}, 2);
staticIncludes({
  length: -100,
  0: 1
}, 1);

(() => staticIncludes())();

TypeError;

(() => staticIncludes(null))();

TypeError;

(() => staticIncludes({
  get length() {
    throw TypeError();
  }

}))();

TypeError;

(() => staticIncludes({
  length: 3,

  get 1() {
    throw TypeError();
  }

}, 2))();

TypeError;

(() => staticIncludes({
  __proto__: {
    get 1() {
      throw TypeError();
    }

  },
  length: 3
}, 2))();

TypeError;

(() => staticIncludes(new Proxy([1], {
  get() {
    throw TypeError();
  }

})))();

TypeError;

function assertTrue(v) {
  v;
  true;
}

function assertFalse(v) {
  v;
  false;
}

function staticIncludes(o, v, f) {
  return [].includes.call(o, v, f);
}

if (typeof reportCompare === "function") {
  reportCompare(true, true);
}
