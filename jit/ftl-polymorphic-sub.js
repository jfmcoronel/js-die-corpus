//@ runFTLNoCJIT
var o1 = {
  i: 0,
  valueOf: function () {
    return this.i;
  }
};
var o2 = {
  i: 0,
  valueOf: function () {
    return this.i;
  }
};
result = 0;

function foo(a, b) {
  var result = 0;

  for (var j = 0; j < 10; j++) {
    if (a > b) {
      result += a - b;
    } else {
      result += b - 1;
    }
  } // Busy work just to allow the DFG and FTL to optimize this out. If the above causes
  // us to speculation fail out to the baseline, this busy work will take a lot longer
  // to run.
  // This loop below also gets the DFG to compile this function sooner.


  var origResult = result;

  for (var i = 1; i < 1000; i++) {
    result = result - i;
  }

  result = origResult < result ? origResult : result;
  return result;
}

noInline(foo);
var iterations;
var expectedResult;

if (this.window) {
  // The layout test doesn't like too many iterations and may time out.
  iterations = 10000;
  expectedResult = -4496448060;
} else {
  iterations = 100000;
  expectedResult = 40001940;
}

for (var i = 0; i <= iterations; i++) {
  o1.i = i;

  if (i % 2) {
    result += foo(o1, 10);
  } else {
    result += foo(i, 10);
  }
}

if (result != expectedResult) {
  throw "Bad result: " + result;
}
