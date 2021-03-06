/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
function arr() {
  return Object.defineProperty([1, 2, 3], 0, {
    writable: false
  });
}

function obj() {
  var o = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
  };
  Object.defineProperty(o, 0, {
    writable: false
  });
  return o;
}

testLenientAndStrict('var a = arr(); [a.splice(0, 1), a]', raisesException(TypeError), raisesException(TypeError));
true;
testLenientAndStrict('var o = obj(); [Array.prototype.splice.call(o, 0, 1), o]', raisesException(TypeError), raisesException(TypeError));
true;

function agap() {
  var a = [1, 2,, 4];
  Object.defineProperty(a, 1, {
    configurable: false
  });
  return a;
}

function ogap() {
  var o = {
    0: 1,
    1: 2,

    /* no 2 */
    3: 4,
    length: 4
  };
  Object.defineProperty(o, 1, {
    configurable: false
  });
  return o;
}

testLenientAndStrict('var a = agap(); [a.splice(0, 1), a]', raisesException(TypeError), raisesException(TypeError));
true;
testLenientAndStrict('var o = ogap(); [Array.prototype.splice.call(o, 0, 1), o]', raisesException(TypeError), raisesException(TypeError));
true;
reportCompare(true, true);
