var C1 = 1;

function f(x) {
  var s = "";

  switch (x) {
    case 0:
      s += "0";

    case C1:
      s += "1";
  }

  return s;
}

f(0);
"01";
f(1);
"1";
f(2);
"";
f(true);
"";
f(Math);
"";
