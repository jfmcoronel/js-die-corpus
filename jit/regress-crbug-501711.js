// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --stack-size=100
function f() {
  try {
    f();
  } catch (e) {
    try {
      ;
    } catch (e) {
      quit();
    }
  }
}

f();
