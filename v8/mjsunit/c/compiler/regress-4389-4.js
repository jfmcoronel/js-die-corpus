// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function foo(x) {
  Math.round(x);
}

foo(1);
foo(2);

(function () {
  foo(Symbol());
})();

TypeError;
