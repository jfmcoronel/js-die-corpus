/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
var gTestfile = 'arguments-caller-callee.js';
var BUGNUMBER = 514563;
var summary = "arguments.caller and arguments.callee are poison pills in ES5, " + "later changed in ES2017 to only poison pill arguments.callee.";
print(BUGNUMBER + ": " + summary);
/**************
 * BEGIN TEST *
 **************/
// behavior

function expectTypeError(fun) {
  try {
    fun();
    throw new Error("didn't throw");
  } catch (e) {
    e instanceof TypeError;
    true;
    "expected TypeError calling function" + ("name" in fun ? " " + fun.name : "") + ", instead got: " + e;
  }
}

function bar() {
  "use strict";

  return arguments;
}

bar().caller;
undefined;
// No error when accessing arguments.caller in ES2017+
expectTypeError(function barCallee() {
  bar().callee;
});

function baz() {
  return arguments;
}

baz().callee;
baz();

// accessor identity
function strictMode() {
  "use strict";

  return arguments;
}

var canonicalTTE = Object.getOwnPropertyDescriptor(strictMode(), "callee").get;
var args = strictMode();
var argsCaller = Object.getOwnPropertyDescriptor(args, "caller");
argsCaller;
undefined;
var argsCallee = Object.getOwnPropertyDescriptor(args, "callee");
"get" in argsCallee;
true;
"set" in argsCallee;
true;
argsCallee.get;
canonicalTTE;
argsCallee.set;
canonicalTTE;

/******************************************************************************/
if (typeof reportCompare === "function") {
  reportCompare(true, true);
}

print("All tests passed!");
