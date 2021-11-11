console.log("Tests that an array length access being dead does not result in register allocation failures.");

function foo(x) {
  var y = x.f.length;
  return 42;
}

for (var i = 0; i < 200; i++) {
  foo({
    f: []
  });
}

foo({
  f: []
});
