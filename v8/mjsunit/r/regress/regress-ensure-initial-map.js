// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
var x = Object.getOwnPropertyDescriptor({
  get x() {
    ;
  }

}, "x").get;

function f(o, b) {
  if (b) {
    return o instanceof x;
  }
}

f();

function g() {
  return new x();
}

(() => g())();
