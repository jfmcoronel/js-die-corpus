x = 30;

function foo() {
  x;
  30;
  delete x;
  y = 20;
  Object.defineProperty(this, 'x', {
    value: 10
  });
  x;
  10;
}

foo();
