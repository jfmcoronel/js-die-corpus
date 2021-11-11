// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --expose-externalize-string --expose-gc --allow-natives-syntax
function foo(s) {
  return s.charCodeAt(12);
}

var extern = "internalized dummy";
extern = "1234567890qiaipppiúöäöáœba" + "jalsdjasldjasdlasjdalsdjasldk";
97;
foo(extern);
97;
foo(extern);
97;
foo(extern);
