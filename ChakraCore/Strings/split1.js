//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
print("Test : var ss = new String(\"HellosWorldsTosFoosBar\");");
ss = new String("HellosWorldsTosFoosBar");
arr = ss.split();
print("ss.split(): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("");
print("ss.split(\"\"): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("s");
print("ss.split(\"s\"): Length:" + arr.length + ". Values:" + arr);
print("Test : var ss = new String(\"firstbsecondb\" + \"thirdbfo\" + \"urthbfifthb\");");
ss = new String("firstbsecondb" + "thirdbfo" + "urthbfifthb");
arr = ss.split();
print("ss.split(): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("");
print("ss.split(\"\"): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("b");
print("ss.split(\"b\"): Length:" + arr.length + ". Values:" + arr);
print("Test : var ss = new String(\"0123\" + \"0123456789\" + \"\" + \"hideundefined01234567\" + \"234567\");");
ss = new String("0123" + "0123456789" + "" + "hideundefined01234567" + "234567");
arr = ss.split();
print("ss.split(): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("");
print("ss.split(\"\"): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("undefined");
print("ss.split(\"undefined\"): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 1000);
print("ss.split(\"2\", 1000): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 2);
print("ss.split(\"2\", 2): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 0);
print("ss.split(\"2\", 0): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", undefined);
print("ss.split(\"2\", undefined): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", null);
print("ss.split(\"2\", null): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", -3);
print("ss.split(\"2\", -3): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 1.3);
print("ss.split(\"2\", 1.3): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", -1.3);
print("ss.split(\"2\", -1.3): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 2 - Math.pow(2, 32));
print("ss.split(\"2\", 2 - Math.pow(2, 32)): Length:" + arr.length + ". Values:" + arr);
arr = ss.split("2", 2.3 - Math.pow(2, 32));
print("ss.split(\"2\", 2.3 - Math.pow(2, 32)): Length:" + arr.length + ". Values:" + arr);
arr = ss.split(void 0, 0);
print("ss.split(void 0, 0): Length:" + arr.length + ". Values:" + arr); //implicit calls

var a = 1;
var b = 2;
var obj = {
  toString: function () {
    a = 3;
    return "Hello World";
  }
};
a = b;
Object.prototype.split = String.prototype.split;
var f = obj.split();
print(a);
