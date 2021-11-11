// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Generated by tools/bigint-tester.py.
var data = [{
  a: 0x26ffcdbd233a53e7ca4612f2b02e1f2c1d885c3177e0,
  r: 0x26ffcdbd233a53e7ca4612f2b02e1f2c1d885c3177e0
}, {
  a: 0xf2a29a35193377a223ef0d6d98db95eeb24a4165f288fd2b0,
  r: 0xf2a29a35193377a223ef0d6d98db95eeb24a4165f288fd2b40
}, {
  a: 0x454d22e29e6100,
  r: 0x454d22e29e6100
}, {
  a: -0xb00874640d30e6fce6bf79508378ed17e44dacb48a4200bce536cec462b3c0,
  r: -0xb00874640d30e6fce6bf79508378ed17e44dacb48a4200bce536cec462b3c0
}, {
  a: 0x4c151a24d765249c2bab4a1915b24b80ae437417c0,
  r: 0x4c151a24d765249c2bab4a1915b24b80ae437417c0
}, {
  a: -0xcbd476b1f9ca08ff820940,
  r: -0xcbd476b1f9ca08ff820940
}, {
  a: -0xe848e5830fa1035322b39c2cdd031109ca0,
  r: -0xe848e5830fa1035322b39c2cdd031109ca0
}, {
  a: -0x4d58c5e190f0ebac5bb36ca4d214069f69726c63a0,
  r: -0x4d58c5e190f0ebac5bb36ca4d214069f69726c63a0
}, {
  a: 0x9b390,
  r: 0x9b390
}, {
  a: 0x593921fe8b9d4900,
  r: 0
}, {
  a: -0xe127928c7cecd6e9ca94d98e858f9c76a0fccac62203aac7710cef1f9e350,
  r: -0xe127928c7cecd6e9ca94d98e858f9c76a0fccac62203aac7710cef1f9e350
}, {
  a: 0xeb14cd952d06eb6fc613016f73b7339cbdd010,
  r: 0xeb14cd952d06eb6fc613016f73b7339cbdd00
}, {
  a: -0xfdeab6a3dbd603137f680413fecc9e1c80,
  r: -0xfdeab6a3dbd603137f680413fecc9e1c80
}, {
  a: -0x7e9abbdfad170df2129dae8e15088a02b9ba99276a351a00,
  r: -0x7e9abbdfad170df2129dae8e15088a02b9ba99276a351a00
}, {
  a: 0x7b98f50,
  r: 0x7b98f50
}, {
  a: -0x919751deb470faa60d7c5c995c8bed72f9542d710fbbf1340,
  r: -0x919751deb470faa60d7c5c995c8bed72f9542d710fbbf1340
}, {
  a: -0xc5541d89b118a88afdd187228440427c8a24f9d0,
  r: -0
}, {
  a: -0xe6c88a170590,
  r: -0xe6c88a1705960
}, {
  a: -0xa1ffbfa388c332804dc4dc970,
  r: -0xa1ffbfa388c332804dc4dc970
}, {
  a: 0x67b768ce0c415127a77402861d1901dd7f60a8624ebea6ecafe03adc30,
  r: 0
}];
var error_count = 0;

for (var i = 0; i < data.length; i++) {
  var d = data[i];
  var r = --d.a;

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