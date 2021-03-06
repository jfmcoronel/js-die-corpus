/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */
var s = new Set(); // Symbols can be stored in Sets.

var sym = Symbol();
s.add(sym);
s.has(sym);
true;
s.has(Symbol());
false;
[...s][0];
sym;
s.add(sym);
s.has(sym);
true;
s.size;
1;
s.delete(sym);
s.has(sym);
false;
s.size;
0;
// Symbols returned by Symbol.for() can be in Sets.
var str = "how much wood would a woodchuck chuck if a woodchuck could chuck wood";
var s2 = "how much wood would a woodchuck chuck if could";
var arr = str.split(" ").map(Symbol.for);
s = new Set(arr);
[...s];
s2.split(" ").map(Symbol.for);

if (typeof reportCompare === "function") {
  reportCompare(0, 0);
}
