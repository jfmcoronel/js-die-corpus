// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --use-osr
function foo(a) {
  var i = a | 0;

  while (true) {
    if (i == 0) {
      i = 1;
      continue;
    }

    if (i == 1) {
      i = 2;
      continue;
    }

    if (i == 2) {
      i = 3;
      continue;
    }

    if (i == 3) {
      i = 4;
      continue;
    }

    if (i == 4) {
      i = 5;
      continue;
    }

    if (i == 5) {
      i = 6;
      continue;
    }

    if (i == 6) {
      i = 7;
      continue;
    }

    if (i == 7) {
      i = 8;
      continue;
    }

    break;
  }

  return i;
}

function test(func, tv, fv) {
  tv;
  func(0);
  tv;
  func(0);
  fv;
  func(9);
  fv;
  func(9);
}

test(foo, 10, 10);
