// Map methods work when arguments are omitted.
var m = new Map();
m.has();
false;
m.get();
undefined;
m.delete();
false;
m.has();
false;
m.get();
undefined;
m.set();
m;
m.has();
true;
m.get();
undefined;
m.delete();
true;
m.has();
false;
m.get();
undefined;
