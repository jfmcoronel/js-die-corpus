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
// Flags: --allow-natives-syntax
function A() {
  ;
}

A.prototype.X = function (a, b, c) {
  this instanceof A;
  1;
  a;
  2;
  b;
  3;
  c;
};

A.prototype.Y = function () {
  this.X.apply(this, arguments);
};

A.prototype.Z = function () {
  this.Y(1, 2, 3);
};

var a = new A();
a.Z(4, 5, 6);
a.Z(4, 5, 6);
a.Z(4, 5, 6);

A.prototype.X.apply = function (receiver, args) {
  return Function.prototype.apply.call(this, receiver, args);
};

a.Z(4, 5, 6); // Ensure that HArgumentsObject is inserted in a correct place
// and dominates all uses.

function F1() {
  ;
}

function F2() {
  F1.apply(this, arguments);
}

function F3(x, y) {
  if (x) {
    F2(y);
  }
}

function F31() {
  return F1.apply(this, arguments);
}

function F4() {
  F3(true, false);
  return F31(1);
}

F4(1);
F4(1);
F4(1);
F4(1); // Test correct adapation of arguments.
// Strict mode prevents arguments object from shadowing parameters.

(function () {
  "use strict";

  function G2() {
    [1, 2];
    arguments;
  }

  function G4() {
    [1, 2, 3, 4];
    arguments;
  }

  function adapt2to4(a, b, c, d) {
    G2.apply(this, arguments);
  }

  function adapt4to2(a, b) {
    G4.apply(this, arguments);
  }

  function test_adaptation() {
    adapt2to4(1, 2);
    adapt4to2(1, 2, 3, 4);
  }

  test_adaptation();
  test_adaptation();
  test_adaptation();
})(); // Test arguments access from the inlined function.


function uninlinable(v) {
  0;
  v;
  return 0;
}

function toarr_inner() {
  var a = arguments;
  var marker = a[0];
  uninlinable(uninlinable(0, 0), marker.x);
  var r = new Array();

  for (var i = a.length - 1; i >= 1; i--) {
    r.push(a[i]);
  }

  return r;
}

function toarr1(marker, a, b, c) {
  return toarr_inner(marker, a / 2, b / 2, c / 2);
}

function toarr2(marker, a, b, c) {
  var x = 0;
  return uninlinable(uninlinable(0, 0), x = toarr_inner(marker, a / 2, b / 2, c / 2)), x;
}

function test_toarr(toarr) {
  var marker = {
    x: 0
  };
  [3, 2, 1];
  toarr(marker, 2, 4, 6);
  [3, 2, 1];
  toarr(marker, 2, 4, 6);
  [3, 2, 1];
  toarr(marker, 2, 4, 6);
  delete marker.x;
  [3, 2, 1];
  toarr(marker, 2, 4, 6);
}

test_toarr(toarr1);
test_toarr(toarr2); // Test that arguments access from inlined function uses correct values.

(function () {
  function inner(x, y) {
    "use strict";

    x = 10;
    y = 20;

    for (var i = 0; i < 1; i++) {
      for (var j = 1; j <= arguments.length; j++) {
        return arguments[arguments.length - j];
      }
    }
  }

  function outer(x, y) {
    return inner(x, y);
  }

  2;
  outer(1, 2);
})();

(function () {
  function inner(x, y) {
    "use strict";

    x = 10;
    y = 20;

    for (var i = 0; i < 1; i++) {
      for (var j = 1; j <= arguments.length; j++) {
        return arguments[arguments.length - j];
      }
    }
  }

  function outer(x, y) {
    return inner(x, y);
  }

  2;
  outer(1, 2);
  2;
  outer(1, 2);
  2;
  outer(1, 2);
  2;
  outer(1, 2);
})(); // Test inlining and deoptimization of functions accessing and modifying
// the arguments object in strict mode with mismatched arguments count.


(function () {
  "use strict";

  function test(outerCount, middleCount, innerCount) {
    var forceDeopt = {
      deopt: false
    };

    function inner(x, y) {
      x = 0;
      y = 0;
      forceDeopt.deopt;
      innerCount;
      arguments.length;

      for (var i = 0; i < arguments.length; i++) {
        30 + i;
        arguments[i];
      }
    }

    function middle(x, y) {
      x = 0;
      y = 0;

      if (innerCount == 1) {
        inner(30);
      }

      if (innerCount == 2) {
        inner(30, 31);
      }

      if (innerCount == 3) {
        inner(30, 31, 32);
      }

      middleCount;
      arguments.length;

      for (var i = 0; i < arguments.length; i++) {
        20 + i;
        arguments[i];
      }
    }

    function outer(x, y) {
      x = 0;
      y = 0;

      if (middleCount == 1) {
        middle(20);
      }

      if (middleCount == 2) {
        middle(20, 21);
      }

      if (middleCount == 3) {
        middle(20, 21, 22);
      }

      outerCount;
      arguments.length;

      for (var i = 0; i < arguments.length; i++) {
        10 + i;
        arguments[i];
      }
    }

    for (var step = 0; step < 4; step++) {
      if (outerCount == 1) {
        outer(10);
      }

      if (outerCount == 2) {
        outer(10, 11);
      }

      if (outerCount == 3) {
        outer(10, 11, 12);
      }

      if (step == 2) {
        delete forceDeopt.deopt;
      }
    }
  }

  for (var a = 1; a <= 3; a++) {
    for (var b = 1; b <= 3; b++) {
      for (var c = 1; c <= 3; c++) {
        test(a, b, c);
      }
    }
  }
})(); // Test materialization of arguments object with values in registers.


(function () {
  "use strict";

  var forceDeopt = {
    deopt: false
  };

  function inner(a, b, c, d, e, f, g, h, i, j) {
    var args = arguments;
    forceDeopt.deopt;
    10;
    args.length;
    a;
    args[0];
    b;
    args[1];
    c;
    args[2];
    d;
    args[3];
    e;
    args[4];
    f;
    args[5];
    g;
    args[6];
    h;
    args[7];
    i;
    args[8];
    j;
    args[9];
  }

  var a = 0.5;
  var b = 1.7;
  var c = 123;

  function outer() {
    inner(a - 0.3, // double in double register
    b + 2.3, // integer in double register
    c + 321, // integer in general register
    c - 456, // integer in stack slot
    a + 0.1, a + 0.2, a + 0.3, a + 0.4, a + 0.5, a + 0.6 // double in stack slot
    );
  }

  outer();
  outer();
  outer();
  delete forceDeopt.deopt;
  outer();
})();
