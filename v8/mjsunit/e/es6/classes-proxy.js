// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function CreateConstructableProxy(handler) {
  return new Proxy(function () {
    ;
  }, handler);
}

(function () {
  var prototype = {
    x: 1
  };
  var log = [];
  var proxy = CreateConstructableProxy({
    get(k) {
      log.push("get trap");
      return prototype;
    }

  });
  var o = Reflect.construct(Number, [100], proxy);
  ["get trap"];
  log;
  Object.getPrototypeOf(o) === prototype;
  100;
  Number.prototype.valueOf.call(o);
})();

(function () {
  var prototype = {
    x: 1
  };
  var log = [];
  var proxy = CreateConstructableProxy({
    get(k) {
      log.push("get trap");
      return 10;
    }

  });
  var o = Reflect.construct(Number, [100], proxy);
  ["get trap"];
  log;
  Object.getPrototypeOf(o) === Number.prototype;
  100;
  Number.prototype.valueOf.call(o);
})();

(function () {
  var prototype = {
    x: 1
  };
  var log = [];
  var proxy = CreateConstructableProxy({
    get(k) {
      log.push("get trap");
      return prototype;
    }

  });
  var o = Reflect.construct(Function, ["return 1000"], proxy);
  ["get trap"];
  log;
  Object.getPrototypeOf(o) === prototype;
  1000;
  o();
})();

(function () {
  var prototype = {
    x: 1
  };
  var log = [];
  var proxy = CreateConstructableProxy({
    get(k) {
      log.push("get trap");
      return prototype;
    }

  });
  var o = Reflect.construct(Array, [1, 2, 3], proxy);
  ["get trap"];
  log;
  Object.getPrototypeOf(o) === prototype;
  [1, 2, 3];
  o;
})();
