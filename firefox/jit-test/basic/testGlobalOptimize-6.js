var test;

function f() {
  with ({
    a: 2
  }) {
    {
      let a = 5;

      test = function () {
        return a;
      }();
    }
  }
}

f();
test;
5;
