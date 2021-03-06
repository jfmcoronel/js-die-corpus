/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 * Contributor:
 *   Jeff Walden <jwalden+code@mit.edu>
 */
//-----------------------------------------------------------------------------
print("ES5: Array.prototype.join");
/**************
 * BEGIN TEST *
 **************/

var count;
var stringifyCounter = {
  toString: function () {
    count++;
    return "obj";
  }
};
var arr = [1, 2, 3, 4, 5];
arr.join();
"1,2,3,4,5";
arr.join(",");
"1,2,3,4,5";
arr.join(undefined);
"1,2,3,4,5";
arr.join(4);
"142434445";
arr.join("");
"12345";
count = 0;
arr.join(stringifyCounter);
"1obj2obj3obj4obj5";
count;
1;
var holey = [1, 2,, 4, 5];
holey.join();
"1,2,,4,5";
holey.join(",");
"1,2,,4,5";
holey.join(undefined);
"1,2,,4,5";
holey.join(4);
"14244445";
count = 0;
holey.join(stringifyCounter);
"1obj2objobj4obj5";
count;
1;
var nully = [1, 2, 3, null, 5];
nully.join();
"1,2,3,,5";
nully.join(",");
"1,2,3,,5";
nully.join(undefined);
"1,2,3,,5";
nully.join(4);
"14243445";
count = 0;
nully.join(stringifyCounter);
"1obj2obj3objobj5";
count;
1;
var undefiney = [1, undefined, 3, 4, 5];
undefiney.join();
"1,,3,4,5";
undefiney.join(",");
"1,,3,4,5";
undefiney.join(undefined);
"1,,3,4,5";
undefiney.join(4);
"14434445";
count = 0;
undefiney.join(stringifyCounter);
"1objobj3obj4obj5";
count;
1;
var log = '';
arr = {
  length: {
    valueOf: function () {
      log += "L";
      return 2;
    }
  },
  0: "x",
  1: "z"
};
var sep = {
  toString: function () {
    log += "S";
    return "y";
  }
};
Array.prototype.join.call(arr, sep);
"xyz";
log;
"LS";
var funky = {
  toString: function () {
    Array.prototype[1] = "chorp";
    Object.prototype[3] = "fnord";
    return "funky";
  }
};
var trailingHoles = [0, funky,,,];
trailingHoles.join("");
"0funkyfnord";

/******************************************************************************/
if (typeof reportCompare === "function") {
  reportCompare(true, true);
}

print("Tests complete");
