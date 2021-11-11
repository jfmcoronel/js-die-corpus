// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Generated by tools/bigint-tester.py.
var data = [{
  a: 0xc,
  r: -0xc
}, {
  a: -0x5a3d0f6cdb7987a2d262838c05359f786a484d052520,
  r: 0x5a3d0f6cdb7987a2d262838c05359f786a484d052520
}, {
  a: -0x98d8c6cbfd67b6b652b7a4670478f6706e06a0,
  r: 0x98d8c6cbfd67b6b652b7a4670478f6706e06a0
}, {
  a: -0xe66ac692ff012bd0f4ca38804628f71ff411aede09c59590,
  r: 0xe66ac692ff012bd0f4ca38804628f71ff411aede09c59590
}, {
  a: -0x97e1e0c13c0c0c420aca92268ea802047c30570335de0000d,
  r: 0x97e1e0c13c0c0c420aca92268ea802047c30570335de0000d
}, {
  a: 0x6b2eddc3b212913abed4f5c84e3eee64d6463224dff0,
  r: -0x6b2eddc3b212913abed4f5c84e3eee64d6463224dff0
}, {
  a: -0xfcd42a712dd928deb51ab2d151fa6bee0f4dd2fa0,
  r: 0xfcd42a712dd928deb51ab2d151fa6bee0f4dd2fa0
}, {
  a: -0x75ba8e0e92a05ff552f2dc3afb39a4d,
  r: 0x75ba8e0e92a05ff552f2dc3afb39a4d
}, {
  a: 0x4570376e541836fab5190e08a,
  r: -0x4570376e541836fab5190e08a
}, {
  a: 0x15aca33cfb00,
  r: -0x15aca33cfb00
}, {
  a: 0x7ec0027910c44b791bf193c6f25487a9430,
  r: -0x7ec0027910c44b791bf193c6f25487a9430
}, {
  a: -0x31f0d92f358618e6b29a2899bd988533838d33839fb30,
  r: 0x31f0d92f358618e6b29a2899bd988533838d33839fb30
}, {
  a: 0xb4f84118d797244c982f0,
  r: -0xb4f84118d797244c982f0
}, {
  a: 0x620,
  r: -0x620
}, {
  a: 0x9f35c8968457d07608699df5894c0542f35b73b0b5ce84230,
  r: -0
}, {
  a: -0xb5be1f7937895adc457f051d1f4bc74d556b430,
  r: 0
}, {
  a: 0xcacb413b3cab5a5f5086511728d1afbaa82ca41e69805daf47503e0,
  r: -0xcacb413b3cab5a5f5086511728d1afbaa82ca41e69805daf47503e0
}, {
  a: -0x77ef7cbb15cee20a519a0,
  r: 0x77ef7cbb15cee20a519a0
}, {
  a: -0x71ac9bfe7f5f70038c0,
  r: 0
}, {
  a: -0x500a02b8fd66ee1067022c02c7241acdc42b947bfb933aa95a8d0,
  r: 0x500a02b8fd66ee1067022c02c7241acdc42b947bfb933aa95a8d0
}];
var error_count = 0;

for (var i = 0; i < data.length; i++) {
  var d = data[i];
  var r = -d.a;

  if (d.r !== r) {
    print("Input:    " + d.a.toString(16));
    print("Result:   " + r.toString(16));
    print("Expected: " + d.r);
    error_count++;
  }
}

if (error_count !== 0) {
  print("Finished with " + error_count + " errors.");
  quit(1);
}
