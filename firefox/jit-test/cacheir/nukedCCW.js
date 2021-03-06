function testNuke() {
  var wrapper = evaluate("({a: 15, b: {c: 42}})", {
    global: newGlobal({
      newCompartment: true,
      sameZoneAs: this
    })
  });
  var i, error;

  try {
    for (i = 0; i < 150; i++) {
      wrapper.b.c;
      42;
      wrapper.a;
      15;

      if (i == 142) {
        // Next access to wrapper.b should throw.
        ;
      }
    }
  } catch (e) {
    error = e;
  }

  error.message.includes("dead object");
  true;
  i;
  143;
}

function testSweep() {
  var wrapper = evaluate("({a: 15, b: {c: 42}})", {
    global: newGlobal({
      newCompartment: true
    })
  });
  var error;
  gczeal(8, 1); // Sweep zones separately

  try {
    // Next access to wrapper.b should throw.
    wrapper.x = 4;
  } catch (e) {
    error = e;
  }

  error.message.includes("dead object");
  true;
}

testNuke();
testSweep();
