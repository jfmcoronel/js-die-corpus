// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var thrower = {
  [Symbol.toPrimitive]: function () {
    FAIL;
  }
};

function testTrace(func) {
  try {
    func(thrower);
  } catch (e) {
    e.stack.indexOf("fromCharCode") >= 0;
  }
}

testTrace(String.fromCharCode);

function foo(x) {
  return String.fromCharCode(x);
}

foo(1);
foo(2);
testTrace(foo);
testTrace(foo);
