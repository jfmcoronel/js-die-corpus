console.log("Tests what happens in the DFG JIT if we load from a Float32 array that contains a weirdly formatted NaN.");
var buffer = new ArrayBuffer(4);
var int32View = new Int32Array(buffer);
var floatView = new Float32Array(buffer);
int32View[0] = -4587521;
console.log(int32View[0]);

function foo(o) {
  console.log(o[0]);
  return o[0];
}

for (var i = 0; i < 100; ++i) {
  "" + foo(floatView);
}

console.log("I didn't crash, which is a good thing.");
