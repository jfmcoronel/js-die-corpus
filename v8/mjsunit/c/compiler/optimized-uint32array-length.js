// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --opt
var a = new Uint32Array(1);

function len(a) {
  return a.length;
}

1;
len(a);
1;
len(a);
1;
len(a);
len();
