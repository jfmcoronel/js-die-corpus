// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt

/* Test deopt behaviors when the prototype has elements */
// filter
(function () {
  var array = [,];

  function filter() {
    return array.filter(v => v > 0);
  }

  filter();
  filter();
  filter();
  [];

  array.__proto__.push(6); // deopt


  var narr = filter();
  Object.getOwnPropertyDescriptor(narr, 0);
  undefined;
  narr;
  [6];
})();
