// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function foo(expected, x) {
  var passed = expected.length == x.length;

  for (var i = 0; i < expected.length; i++) {
    if (passed) {
      passed = expected[i] == x[i];
    }
  }

  print("a");
  print(passed);
  print("b");
  print(passed);
  return passed;
}

foo([0, 1], [0, 1]);
foo([0, 2], [0, 2]);
foo([0, 2.25], [0, 2.75]);
foo([0, 1], [0, 1]);
foo([0, 2], [0, 2]);
foo([0, 2.25], [0, 2.75]);
