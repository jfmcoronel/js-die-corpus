// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/
var err;

try {
  {
    let i = 1;
  }
  {
    let j = 1;
    [][j][2];
  }
} catch (e) {
  err = e;
}

err instanceof TypeError;
true;
err.message;
"[][j] is undefined";
reportCompare(0, 0, 'ok');
