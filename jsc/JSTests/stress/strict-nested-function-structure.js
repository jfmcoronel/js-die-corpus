function foo(f) {
  f.hasOwnProperty("arguments");
}

noInline(foo);

function bar() {
  ;
}

foo(bar);

function baz() {
  "use strict";

  function boo() {
    ;
  }

  return boo;
}

foo(baz());
