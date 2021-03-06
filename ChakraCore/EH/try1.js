//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
// basic try/catch testcases
function verify(x, y) {
  if (x != y) {
    print("ERROR: " + x + " != " + y);
  }
}

var objs = [5, undefined, 'c', "test", [1, 2, 3]];

for (var i = 0; i < objs.length; ++i) {
  // test #1: basic try/catch
  try {
    throw objs[i];
  } catch (a) {
    print("caught " + a);
    verify(a, objs[i]);
  } // test #2: try/finally within a try/catch/finally


  try {
    try {
      throw objs[i];
    } finally {
      print("inner finally, i = " + i);
    }
  } catch (a) {
    print("caught " + a);
    verify(a, objs[i]);
  } finally {
    print("outer finally, i = " + i);
  } // test #3: more deeply nested try/catch/finally


  try {
    try {
      try {
        throw objs[i];
      } finally {
        print("finally #3, i = " + i);
      }
    } catch (a) {
      print("caught " + a);
      verify(a, objs[i]);
    } finally {
      print("finally #2, i = " + i);
      throw "another throw";
    }
  } catch (a) {
    print("caught " + a);
    verify(a, "another throw");
  }
}
