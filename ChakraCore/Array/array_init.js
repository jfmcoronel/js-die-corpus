//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function DumpArray(a) {
  var undef_start = -1;

  for (var i = 0; i < a.length; i++) {
    if (a[i] == undefined) {
      if (undef_start == -1) {
        undef_start = i;
      }
    } else {
      if (undef_start != -1) {
        print(undef_start + "-" + (i - 1) + " = undefined");
        undef_start = -1;
      }

      print(i + " = " + a[i]);
    }
  }
}

DumpArray([]);
DumpArray([0]);
DumpArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
DumpArray([,,, 0,,, 1,,, 2,,, 3,,, 4,,, 5,,, 6,,, 7,,, 8,,, 9,,,]);
