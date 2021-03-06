// Indexed getters can add new properties that slice should not ignore.
var arr = [];
Object.defineProperty(arr, 10000, {
  get: function () {
    arr[10001] = 4;
    return 3;
  }
});
arr[10010] = 6;
var res = arr.slice(8000);
res[2000];
3;
res[2001];
4;
res[2010];
6;
