var a = [1, 2, 3, 4];
var count = 0;

function f(arr, i) {
  arr[2] = i;
}

for (var i = 0; i < 80; i++) {
  f(a, i);
  a[2];
  i;
}

delete a[2];
f(a, 50);
a[2];
50;
Object.defineProperty(Object.prototype, "2", {
  set: function () {
    count++;
  }
});
delete a[2];
f(a, 100);
f(a, 100);
a[2];
undefined;
count;
2;
