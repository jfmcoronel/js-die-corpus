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
// Tests of unary delete in cases where it is always true or always false.
// In an effect context, expression is always true.
undefined;
void delete 0;
undefined;

(function (x) {
  delete x;
})(0);

1;
delete 0 ? 1 : 2;
2;

(function (x) {
  return delete x ? 1 : 2;
})(0);

1;

(function (x) {
  return !delete x ? 1 : 2;
})(0);

3;
1 + (delete 0 && 2);
false;

(function (x) {
  return delete x && 2;
})(0);

3;
(delete 0 && 2) + 1;
1;

(function (x) {
  return (delete x && 2) + 1;
})(0);

2;
1 + (delete 0 || 2);
2;

(function (x) {
  return delete x || 2;
})(0);

2;
(delete 0 || 2) + 1;
3;

(function (x) {
  return (delete x || 2) + 1;
})(0);

true;
delete this;
true;

(function () {
  return delete this;
})();
