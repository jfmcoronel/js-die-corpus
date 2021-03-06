// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(() => {
  try {
    throw {};
  } catch ({
    a = b,
    b
  }) {
    a + b;
  }
})();

ReferenceError;

try {
  throw {
    a: 42
  };
} catch ({
  a,
  b = a
}) {
  42;
  b;
}

;
