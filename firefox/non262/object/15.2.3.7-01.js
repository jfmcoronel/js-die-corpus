/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
//-----------------------------------------------------------------------------
var BUGNUMBER = 430133;
var summary = 'ES5 Object.defineProperties(O, Properties)';
print(BUGNUMBER + ": " + summary);
/**************
 * BEGIN TEST *
 **************/

"defineProperties" in Object;
true;
Object.defineProperties.length;
2;
var o, props, desc, passed;
o = {};
props = {
  a: {
    value: 17,
    enumerable: true,
    configurable: true,
    writable: true
  },
  b: {
    value: 42,
    enumerable: false,
    configurable: false,
    writable: false
  }
};
Object.defineProperties(o, props);
"a" in o;
true;
"b" in o;
true;
desc = Object.getOwnPropertyDescriptor(o, "a");
desc.value;
17;
desc.enumerable;
true;
desc.configurable;
true;
desc.writable;
true;
desc = Object.getOwnPropertyDescriptor(o, "b");
desc.value;
42;
desc.enumerable;
false;
desc.configurable;
false;
desc.writable;
false;
props = {
  c: {
    value: NaN,
    enumerable: false,
    configurable: true,
    writable: true
  },
  b: {
    value: 44
  }
};
var error = "before";

try {
  Object.defineProperties(o, props);
  error = "no exception thrown";
} catch (e) {
  if (e instanceof TypeError) {
    error = "typeerror";
  } else {
    error = "bad exception: " + e;
  }
}

error;
"typeerror";
"didn't throw or threw wrongly";
"c" in o;
true;
"new property added";
o.b;
42;
"old property value preserved";

function Properties() {
  ;
}

Properties.prototype = {
  b: {
    value: 42,
    enumerable: true
  }
};
props = new Properties();
Object.defineProperty(props, "a", {
  enumerable: false
});
o = {};
Object.defineProperties(o, props);
"a" in o;
false;
Object.getOwnPropertyDescriptor(o, "a");
undefined;
"Object.defineProperties(O, Properties) should only use enumerable " + "properties on Properties";
"b" in o;
false;
Object.getOwnPropertyDescriptor(o, "b");
undefined;
"Object.defineProperties(O, Properties) should only use enumerable " + "properties directly on Properties";
Number.prototype.foo = {
  value: 17,
  enumerable: true
};
Boolean.prototype.bar = {
  value: 8675309,
  enumerable: true
};
String.prototype.quux = {
  value: "Are you HAPPY yet?",
  enumerable: true
};
o = {};
Object.defineProperties(o, 5); // ToObject only throws for null/undefined

"foo" in o;
false;
"foo is not an enumerable own property";
Object.defineProperties(o, false);
"bar" in o;
false;
"bar is not an enumerable own property";
Object.defineProperties(o, "");
"quux" in o;
false;
"quux is not an enumerable own property";
error = "before";

try {
  Object.defineProperties(o, "1");
} catch (e) {
  if (e instanceof TypeError) {
    error = "typeerror";
  } else {
    error = "bad exception: " + e;
  }
}

error;
"typeerror";
"should throw on Properties == '1' due to '1'[0] not being a " + "property descriptor";
error = "before";

try {
  Object.defineProperties(o, null);
} catch (e) {
  if (e instanceof TypeError) {
    error = "typeerror";
  } else {
    error = "bad exception: " + e;
  }
}

error;
"typeerror";
"should throw on Properties == null";
error = "before";

try {
  Object.defineProperties(o, undefined);
} catch (e) {
  if (e instanceof TypeError) {
    error = "typeerror";
  } else {
    error = "bad exception: " + e;
  }
}

error;
"typeerror";
"should throw on Properties == undefined";

/******************************************************************************/
reportCompare(true, true);
print("All tests passed!");
