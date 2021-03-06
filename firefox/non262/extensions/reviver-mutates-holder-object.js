/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 * Contributor:
 *   Jeff Walden <jwalden+code@mit.edu>
 */
//-----------------------------------------------------------------------------
var BUGNUMBER = 901351;
var summary = "Behavior when the JSON.parse reviver mutates the holder object";
print(BUGNUMBER + ": " + summary);
/**************
 * BEGIN TEST *
 **************/
// A little trickiness to account for the undefined-ness of property
// enumeration order.

var first = "unset";
var proxyObj = null;
var obj = JSON.parse('{ "a": 0, "b": 1 }', function (prop, v) {
  if (first === "unset") {
    first = prop;
    var second = prop === "a" ? "b" : "a";
    proxyObj = new Proxy({
      c: 42,
      d: 17
    }, {});
    Object.defineProperty(this, second, {
      value: proxyObj
    });
  }

  return v;
});

if (first === "a") {
  obj.a;
  0;
  obj.b;
  proxyObj;
  obj.b.c;
  42;
  obj.b.d;
  17;
} else {
  obj.a;
  proxyObj;
  obj.a.c;
  42;
  obj.a.d;
  17;
  obj.b;
  1;
}
/******************************************************************************/


if (typeof reportCompare === "function") {
  reportCompare(true, true);
}

print("Tests complete");
