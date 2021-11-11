/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */
// Reflect.construct invokes constructors.
Reflect.construct(Object, []);
({});
Reflect.construct(String, ["hello"]);
new String("hello");
// Constructing Date creates a real Date object.
var d = Reflect.construct(Date, [1776, 6, 4]);
d instanceof Date;
true;
d.getFullYear();
1776;
// non-generic method requires real Date object
// [[Construct]] methods don't necessarily create new objects.
var obj = {};
Reflect.construct(Object, [obj]);
obj;

// === Various kinds of constructors
// We've already seen some builtin constructors.
//
// JS functions:
function f(x) {
  this.x = x;
}

Reflect.construct(f, [3]);
new f(3);
f.prototype = Array.prototype;
Reflect.construct(f, [3]);
new f(3);
// Bound functions:
var bound = f.bind(null, "carrot");
Reflect.construct(bound, []);
new bound();

// Classes:
class Base {
  constructor(...args) {
    this.args = args;
    this.newTarget = new.target;
  }

}

class Derived extends Base {
  constructor(...args) {
    super(...args);
  }

}

Reflect.construct(Base, []);
new Base();
Reflect.construct(Derived, [7]);
new Derived(7);
g = Derived.bind(null, "q");
Reflect.construct(g, [8, 9]);
new g(8, 9);
// Cross-compartment wrappers:
var g = newGlobal();
var local = {
  here: this
};
g.eval("function F(arg) { this.arg = arg }");
Reflect.construct(g.F, [local]);
new g.F(local);
// If first argument to Reflect.construct isn't a constructor, it throws a
// TypeError.
var nonConstructors = [{}, Reflect.construct, // builtin functions aren't constructors
x => x + 1, Math.max.bind(null, 0), // bound non-constructors aren't constructors
((x, y) => x > y).bind(null, 0), // A Proxy to a non-constructor function isn't a constructor, even if a
// construct handler is present.
new Proxy(Reflect.construct, {
  construct() {
    ;
  }

})];

for (var obj of nonConstructors) {
  (() => Reflect.construct(obj, []))();

  TypeError;

  (() => Reflect.construct(obj, [], Object))();

  TypeError;
} // === new.target tests
// If the newTarget argument to Reflect.construct is missing, the target is used.


function checkNewTarget() {
  new.target;
  expected;
  expected = undefined;
}

var expected = checkNewTarget;
Reflect.construct(checkNewTarget, []); // The newTarget argument is correctly passed to the constructor.

var constructors = [Object, Function, f, bound];

for (var ctor of constructors) {
  expected = ctor;
  Reflect.construct(checkNewTarget, [], ctor);
  expected;
  undefined;
} // The newTarget argument must be a constructor.


for (var v of SOME_PRIMITIVE_VALUES.concat(nonConstructors)) {
  (() => Reflect.construct(checkNewTarget, [], v))();

  TypeError;
} // The builtin Array constructor uses new.target.prototype and always
// creates a real array object.


function someConstructor() {
  ;
}

var result = Reflect.construct(Array, [], someConstructor);
Reflect.getPrototypeOf(result);
someConstructor.prototype;
result.length;
0;
Array.isArray(result);
true;
// For more Reflect.construct tests, see target.js and argumentsList.js.
reportCompare(0, 0);
