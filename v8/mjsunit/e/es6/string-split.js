// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var pattern = {
  toString: () => ""
};
var limit = {
  value: 3
};

pattern[Symbol.split] = function (string, limit) {
  return string.length * limit.value;
}; // Check object coercible fails.


(() => String.prototype.split.call(null, pattern, limit))();

TypeError;
15;
"abcde".split(pattern, limit);
// Non-callable override.
pattern[Symbol.split] = "dumdidum";

(() => "abcde".split(pattern, limit))();

TypeError;
// Null override.
pattern[Symbol.split] = null;
["a", "b", "c", "d", "e"];
"abcde".split(pattern);
"[Symbol.split]";
RegExp.prototype[Symbol.split].name;
