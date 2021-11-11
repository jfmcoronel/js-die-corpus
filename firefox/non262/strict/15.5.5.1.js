/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
function str() {
  return new String("foo");
}

testLenientAndStrict('var s = str(); s.length = 1; s.length', returns(3), raisesException(TypeError));
true;
testLenientAndStrict('var s = str(); delete s.length', returns(false), raisesException(TypeError));
true;
testLenientAndStrict('"foo".length = 1', returns(1), raisesException(TypeError));
true;
testLenientAndStrict('delete "foo".length', returns(false), raisesException(TypeError));
true;
reportCompare(true, true);
