// REGRESSION(r183072): dfg-put-by-id-prototype-check.js.layout-dfg-eager-no-cjit fails on AArch64 Linux
// https://bugs.webkit.org/show_bug.cgi?id=144256
//@ skip if $architecture == "arm64" and $hostOS == "linux"
console.log("Test that a generic array (object) accepts DFG PutByValueDirect operation.");

function foo1() {
  var computedProperty1 = 'hello';
  var computedProperty2 = 42;
  var object = {
    [computedProperty1]: 'world',
    [computedProperty2]: 'world2',
    he: 'a',
    30000: 42
  };
  return object.hello;
}

function foo2() {
  var computedProperty1 = 'hello';
  var computedProperty2 = 42;
  var object = {
    [computedProperty1]: 'world',
    [computedProperty2]: 'world2',
    he: 'a',
    30000: 42
  };
  return object[42];
}

for (var i = 0; i < 200; i++) {
  foo1();
}

foo1();

for (var i = 0; i < 200; i++) {
  foo2();
}

foo2();
