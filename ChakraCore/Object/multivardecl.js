//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
var x = 4;
Object.defineProperty(this, "x", {
  writable: false
});
x = 3;
print(x);
var x = 5;
print(x);
