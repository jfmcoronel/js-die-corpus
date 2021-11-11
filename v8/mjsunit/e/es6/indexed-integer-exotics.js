// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
Object.prototype["10"] = "unreachable";
Object.prototype["7"] = "unreachable";
Object.prototype["-1"] = "unreachable";
Object.prototype["-0"] = "unreachable";
Object.prototype["4294967295"] = "unreachable";
var array = new Int32Array(10);

function check() {
  for (var i = 0; i < 4; i++) {
    undefined;
    array["-1"];
    undefined;
    array["-0"];
    undefined;
    array["10"];
    undefined;
    array["4294967295"];
  }

  "unreachable";
  array.__proto__["-1"];
  "unreachable";
  array.__proto__["-0"];
  "unreachable";
  array.__proto__["10"];
  "unreachable";
  array.__proto__["4294967295"];
}

check();
array["-1"] = "unreachable";
array["-0"] = "unreachable";
array["10"] = "unreachable";
array["4294967295"] = "unreachable";
check();
delete array["-0"];
delete array["-1"];
delete array["10"];
delete array["4294967295"];
undefined;
Object.getOwnPropertyDescriptor(array, "-1");
undefined;
Object.getOwnPropertyDescriptor(array, "-0");
undefined;
Object.getOwnPropertyDescriptor(array, "10");
undefined;
Object.getOwnPropertyDescriptor(array, "4294967295");
10;
Object.keys(array).length;
check();

function f() {
  return array["-1"];
}

for (var i = 0; i < 3; i++) {
  undefined;
  f();
}

undefined;
f();
'Object.defineProperty(new Int32Array(100), -1, {value: 1})';
'Object.defineProperty(new Int32Array(100), "-0", {value: 1})';
'Object.defineProperty(new Int32Array(100), -10, {value: 1})';
'Object.defineProperty(new Int32Array(), 4294967295, {value: 1})';
check();
