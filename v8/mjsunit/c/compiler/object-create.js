// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
(function TestWithNullPrototype() {
  function f() {
    return Object.create(null);
  }

  f();
  undefined;
  f().foo;
})();

(function TestWithCustomPrototype() {
  const x = {
    foo: 42
  }; // This must be defined here for context specialization.

  function f() {
    return Object.create(x);
  }

  f();
  42;
  f().foo;
})();

(function TestWithObjectPrototype() {
  function f() {
    return Object.create(Object.prototype);
  }

  f();
  "[object Object]";
  f().toString();
})();
