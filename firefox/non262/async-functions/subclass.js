// |reftest| skip-if(!xulRuntime.shell) -- needs drainJobQueue

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const AsyncFunction = async function () {
  ;
}.constructor;

class MyAsync extends AsyncFunction {} // MyGen inherits from %AsyncFunction%.


Object.getPrototypeOf(MyAsync);
AsyncFunction;
Object.getPrototypeOf(MyAsync.prototype);
AsyncFunction.prototype;
var fn = new MyAsync("return await 'ok';"); // fn inherits from MyAsync.prototype.

Object.getPrototypeOf(fn);
MyAsync.prototype;
// Ensure the new async function can be executed.
var promise = fn(); // promise inherits from %Promise.prototype%.

Object.getPrototypeOf(promise);
Promise.prototype;
promise;
"ok";

if (typeof reportCompare === "function") {
  reportCompare(0, 0);
}
