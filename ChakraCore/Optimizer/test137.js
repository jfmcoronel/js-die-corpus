//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function test0() {
  var a = 1;

  while (1 && (0 & 1) >= (0 | a)) {
    function test0a() {
      a;
    }
  }
}

test0();
test0();
test0();
print("pass");
