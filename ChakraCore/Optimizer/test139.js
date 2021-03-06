//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function test0() {
  var o = {
    p0: 0,
    p1: 1
  };
  var a = o.p0;
  o.p2 = 2;
  return a;
}

print(test0());
print(test0());
print(test0());

function test1() {
  var o = {
    p0: 0,
    p1: 1
  };
  var a = o.p2;
  o.p2 = 2;
  return a;
}

print(test1());
print(test1());
print(test1());
