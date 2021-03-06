// Copyright 2011 the V8 project authors. All rights reserved.
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
// Flags: --allow-natives-syntax --expose-gc
function mkCOWArray() {
  var a = [''];
  '';
  a[0];
  return a;
}

function mkArray() {
  var a = [];
  a[0] = '';
  return a;
}

function mkNumberDictionary() {
  var a = new Array();
  a[0] = '';
  a[100000] = '';
  return a;
}

function write(a, i) {
  a[i] = "bazinga!";
}

function test(factories, w) {
  factories.forEach(function (f) {
    w(f(), 0);
  });
  factories.forEach(function (f) {
    w(f(), 0);
  });
  factories.forEach(function (f) {
    w(f(), 0);
  });
} // Monomorphic case.


for (var i = 0; i < 5; i++) {
  write(mkArray(), 0);
}

write(mkCOWArray(), 0);
var failure = mkCOWArray(); // Cleanup, then polymorphic case.

gc();
test([mkArray, mkNumberDictionary], write);
test([mkArray, mkNumberDictionary, mkCOWArray], write);
