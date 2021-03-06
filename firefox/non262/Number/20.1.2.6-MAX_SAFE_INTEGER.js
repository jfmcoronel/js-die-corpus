// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/
//-----------------------------------------------------------------------------
var BUGNUMBER = 885798;
var summary = "ES6 (draft April 2014) 20.1.2.6 Number.MAX_SAFE_INTEGER";
print(BUGNUMBER + ": " + summary);
/**************
 * BEGIN TEST *
 **************/
// Test value

Number.MAX_SAFE_INTEGER;
Math.pow(2, 53) - 1;
//Test property attributes
var descriptor = Object.getOwnPropertyDescriptor(Number, 'MAX_SAFE_INTEGER');
descriptor.writable;
false;
descriptor.configurable;
false;
descriptor.enumerable;
false;

if (typeof reportCompare === "function") {
  reportCompare(true, true);
}
