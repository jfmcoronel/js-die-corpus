console.log("Tests what happens when you multiply a big unknown integer with a small known integer.");

function foo(a) {
  return a * 65536;
}

for (var i = 0; i < 100; ++i) {
  foo(2147483647);
}
