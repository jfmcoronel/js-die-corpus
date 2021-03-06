console.log("This test checks exceptional cases for constant counting in the parser.");
const a = 15;
const b = 25;

try {
  --a;
  --b;
} catch (e) {
  ;
}

if (a !== 15) {
  console.log("Unexpected result for 'a'");
} else {
  console.log("'a' is all good");
}

function f() {
  const a = 10;
  const b = 20;

  try {
    ;
  } catch (e) {
    a--;
    b--;
  }

  return a;
}

f();
