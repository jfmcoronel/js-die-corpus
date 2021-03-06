//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
// BLUE#5602: User Mode Write AV starting at Js::SparseArraySegment::EnsureSizeInBound+0x000000000000001a (Hash=0x3c06064b.0x23355e69)
function func2() {
  ;
} // from bug BLUE 5602


function func() {
  e = "div".match(func2());
  print("e = " + e + " ; e.length = " + e.length);
  e.length = 58;
  print("e = " + e + " ; e.length = " + e.length);
  e.splice(1); //es.splice(1,17); is OK too

  print("e = " + e + " ; e.length = " + e.length);
} // from bug BLUE 5602


function func_test2() {
  e = "div".match(func2());
  print("e = " + e + " ; e.length = " + e.length);
  e.length = 58;
  print("e = " + e + " ; e.length = " + e.length);
  e.splice(1, 17);
  print("e = " + e + " ; e.length = " + e.length);
}

function start() {
  print("start- func()");
  func();
  print("start- func_test2()");
  func_test2();
  print("start- done");
}

start();
