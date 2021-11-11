// getJitCompilerOptions will always return array with zeros when JIT is
// disabled. Therefore we quit now.
if (inJit() == 'Baseline is disabled.') {
  print("JIT is disabled.");
  quit();
}

var wait = 100;

var method_A = function () {
  for (var t = 0; t < wait; ++t) {
    ;
  }
};

var method_B = function () {
  for (var t = 0; t < wait; ++t) {
    ;
  }
};

var method_C = function () {
  for (var t = 0; t < wait; ++t) {
    ;
  }
};

var method_D = function () {
  for (var t = 0; t < wait; ++t) {
    ;
  }
};

var func = [method_A, method_B, method_C, method_D];

for (var n = 0; n < 4; ++n) {
  try {
    ;
  } catch (e) {
    if (e.toString().includes("on the stack")) {
      continue;
    }

    throw e;
  }

  for (var i = 0; i < 1001; ++i) {
    func[n]();
  }
}
