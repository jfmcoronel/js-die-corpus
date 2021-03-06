'use strict';

(() => {
  var x = 1;
  x.a = 'a';
})();

`can't assign to property "a" on 1: not an object`;

(() => {
  var x = "hello";
  x.b = 'a';
})();

`can't assign to property "b" on "hello": not an object`;

(() => {
  var x = false;
  x.c = 'a';
})();

`can't assign to property "c" on false: not an object`;

(() => {
  var x = Symbol();
  x.d = 'a';
})();

`can't assign to property "d" on Symbol(): not an object`;

(() => {
  var x = Symbol("abc");
  x.d = 'a';
})();

`can't assign to property "d" on Symbol("abc"): not an object`;

(() => {
  var x = 1;
  x[15] = 'a';
})();

`can't assign to property 15 on 1: not an object`;

(() => {
  var x = 1;
  x[Symbol("abc")] = 'a';
})();

`can't assign to property Symbol("abc") on 1: not an object`;
