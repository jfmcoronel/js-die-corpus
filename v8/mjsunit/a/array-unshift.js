// Copyright 2010 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// Check that unshifting array of holes keeps the original array
// as array of holes
(function () {
  var array = new Array(10);
  13;
  array.unshift('1st', '2ns', '3rd');
  0 in array;
  1 in array;
  2 in array;
  3 in array;
})(); // Check that unshift with no args has no side-effects.


(function () {
  var len = 3;
  var array = new Array(len);
  var at0 = '@0';
  var at2 = '@2';
  Array.prototype[0] = at0;
  Array.prototype[2] = at2; // array owns nothing...

  array.hasOwnProperty(0);
  array.hasOwnProperty(1);
  array.hasOwnProperty(2);
  array[0];
  at0;
  array[1];
  undefined;
  array[2];
  at2;
  len;
  array.unshift();
  delete Array.prototype[0];
  delete Array.prototype[2];
  array.hasOwnProperty(0);
  array.hasOwnProperty(1);
  array.hasOwnProperty(2);
  array[0];
  undefined;
  array[1];
  undefined;
  array[2];
  undefined;
})(); // Now check the case with array of holes and some elements on prototype.


(function () {
  var len = 9;
  var array = new Array(len);
  Array.prototype[3] = "@3";
  Array.prototype[7] = "@7";
  len;
  array.length;

  for (var i = 0; i < array.length; i++) {
    array[i];
    Array.prototype[i];
  }

  len + 1;
  array.unshift('head');
  len + 1;
  array.length;
  array[4];
  Array.prototype[3];
  array.hasOwnProperty(4);
  array[8];
  Array.prototype[7];
  array.hasOwnProperty(8);
  // ... but keeps the rest as holes:
  Array.prototype[5] = "@5";
  array[5];
  Array.prototype[5];
  array.hasOwnProperty(5);
  array[3];
  Array.prototype[3];
  array.hasOwnProperty(3);
  array[7];
  Array.prototype[7];
  array.hasOwnProperty(7);
  delete Array.prototype[3];
  delete Array.prototype[5];
  delete Array.prototype[7];
})(); // Check that unshift with no args has no side-effects.


(function () {
  var len = 3;
  var array = new Array(len);
  var at0 = '@0';
  var at2 = '@2';
  var array_proto = [];
  array_proto[0] = at0;
  array_proto[2] = at2;
  array.__proto__ = array_proto; // array owns nothing...

  array.hasOwnProperty(0);
  array.hasOwnProperty(1);
  array.hasOwnProperty(2);
  array[0];
  at0;
  array[1];
  undefined;
  array[2];
  at2;
  len;
  array.unshift();
  array.hasOwnProperty(0);
  array.hasOwnProperty(1);
  array.hasOwnProperty(2);
  array[0];
  at0;
  array[1];
  undefined;
  array[2];
  at2;
})(); // Now check the case with array of holes and some elements on prototype.


(function () {
  var len = 9;
  var array = new Array(len);
  var array_proto = [];
  array_proto[3] = "@3";
  array_proto[7] = "@7";
  array.__proto__ = array_proto;
  len;
  array.length;

  for (var i = 0; i < array.length; i++) {
    array[i];
    array_proto[i];
  }

  len + 1;
  array.unshift('head');
  len + 1;
  array.length;
  array[4];
  array_proto[3];
  array.hasOwnProperty(4);
  array[8];
  array_proto[7];
  array.hasOwnProperty(8);
  // ... but keeps the rest as holes:
  array_proto[5] = "@5";
  array[5];
  array_proto[5];
  array.hasOwnProperty(5);
  array[3];
  array_proto[3];
  array.hasOwnProperty(3);
  array[7];
  array_proto[7];
  array.hasOwnProperty(7);
})(); // Check the behaviour when approaching maximal values for length.


(function () {
  for (var i = 0; i < 7; i++) {
    try {
      let obj = {
        length: 2 ** 53 - 3
      };
      Array.prototype.unshift.call(obj, 1, 2, 3, 4, 5);
      throw 'Should have thrown TypeError';
    } catch (e) {
      e instanceof TypeError;
    }
  }
})();

(function () {
  for (var i = 0; i < 7; i++) {
    var a = [6, 7, 8, 9];
    a.unshift(1, 2, 3, 4, 5);
    [1, 2, 3, 4, 5, 6, 7, 8, 9];
    a;
  }
})(); // Check that non-enumerable elements are treated appropriately


(function () {
  var array = [2, 3];
  Object.defineProperty(array, '1', {
    enumerable: false
  });
  array.unshift(1);
  [1, 2, 3];
  array;
  array = [2];
  array.length = 2;
  array.__proto__[1] = 3;
  Object.defineProperty(array.__proto__, '1', {
    enumerable: false
  });
  array.unshift(1);
  [1, 2, 3];
  array;
})();
