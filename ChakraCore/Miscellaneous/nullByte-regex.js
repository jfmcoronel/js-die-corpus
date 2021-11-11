//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function assert(b) {
  if (!b) {
    console.log("failed");
  }
}

console.log("before null byte");
let re = /[abc def]/;
re.test('a');
re.test('\0');
re.test('d');
console.log("PASS");
