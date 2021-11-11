/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
// Shu's test
function test(makeNonArray) {
  function C() {
    ;
  }

  C.prototype = [];

  if (makeNonArray) {
    C.prototype.constructor = C;
  }

  c = new C();
  c.push("foo");
  return c.length;
}

test(true);
1;
test(false);
1;
// jorendorff's longer test
var a = [];
a.slowify = 1;
var b = Object.create(a);
b.length = 12;
b.length;
12;
// jorendorff's shorter test
var b = Object.create(Array.prototype);
b.length = 12;
b.length;
12;
reportCompare(true, true);
