//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
var PI = Math.PI;
var c = Math.ceil(PI);
var f = Math.floor(PI);
print(c, f);

(function f() {
  // Test calls that modify the call target operands when the args are evaluated.
  // Do this locally, as that's the case that Eze is likeliest to get wrong.
  var save;
  var O = {
    foo: function () {
      return "O.foo";
    },
    bar: function () {
      return "O.bar";
    }
  };
  O.o = {
    foo: function () {
      return "O.o.foo";
    },
    bar: function () {
      return "O.o.bar";
    }
  };
  print(O.foo(save = O, O = O.o));
  print(O.foo(O = save));
  var str = 'foo';
  print(O[str](O = O.o, str = 'bar'));
  print(O[str](O = save, str = 'foo'));
})();
