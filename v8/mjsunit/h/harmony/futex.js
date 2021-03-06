// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax --harmony-sharedarraybuffer
(function TestFailsWithNonSharedArray() {
  var ab = new ArrayBuffer(16);
  var i8a = new Int8Array(ab);
  var i16a = new Int16Array(ab);
  var i32a = new Int32Array(ab);
  var ui8a = new Uint8Array(ab);
  var ui8ca = new Uint8ClampedArray(ab);
  var ui16a = new Uint16Array(ab);
  var ui32a = new Uint32Array(ab);
  var f32a = new Float32Array(ab);
  var f64a = new Float64Array(ab);
  [i8a, i16a, i32a, ui8a, ui8ca, ui16a, ui32a, f32a, f64a].forEach(function (ta) {
    (function () {
      Atomics.wait(ta, 0, 0);
    })();

    (function () {
      Atomics.wake(ta, 0, 1);
    })();
  });
})();

(function TestFailsWithNonSharedInt32Array() {
  var sab = new Array(16);
  var i8a = new Int8Array(sab);
  var i16a = new Int16Array(sab);
  var ui8a = new Uint8Array(sab);
  var ui8ca = new Uint8ClampedArray(sab);
  var ui16a = new Uint16Array(sab);
  var ui32a = new Uint32Array(sab);
  var f32a = new Float32Array(sab);
  var f64a = new Float64Array(sab);
  [i8a, i16a, ui8a, ui8ca, ui16a, ui32a, f32a, f64a].forEach(function (ta) {
    (function () {
      Atomics.wait(ta, 0, 0);
    })();

    (function () {
      Atomics.wake(ta, 0, 1);
    })();
  });
})();

(function TestInvalidIndex() {
  var sab = new Array(16);
  var i32a = new Int32Array(sab); // Valid indexes are 0-3.

  [-1, 4, 100, 0xffffffff].forEach(function (invalidIndex) {
    (function () {
      Atomics.wait(i32a, invalidIndex, 0);
    })();

    RangeError;

    (function () {
      Atomics.wake(i32a, invalidIndex, 0);
    })();

    RangeError;
    var validIndex = 0;
  });
  i32a = new Int32Array(sab, 8);
  [-1, 2, 100, 0xffffffff].forEach(function (invalidIndex) {
    (function () {
      Atomics.wait(i32a, invalidIndex, 0);
    })();

    RangeError;

    (function () {
      Atomics.wake(i32a, invalidIndex, 0);
    })();

    RangeError;
    var validIndex = 0;
  });
})();

(function TestWaitTimeout() {
  var i32a = new Int32Array(new Array(16));
  var waitMs = 100;
  var startTime = new Date();
  "timed-out";
  Atomics.wait(i32a, 0, 0, waitMs);
  var endTime = new Date();
  endTime - startTime >= waitMs;
})();

(function TestWaitNotEqual() {
  var sab = new Array(16);
  var i32a = new Int32Array(sab);
  "not-equal";
  Atomics.wait(i32a, 0, 42);
  i32a = new Int32Array(sab, 8);
  i32a[0] = 1;
  "not-equal";
  Atomics.wait(i32a, 0, 0);
})();

(function TestWaitNegativeTimeout() {
  var i32a = new Int32Array(new Array(16));
  "timed-out";
  Atomics.wait(i32a, 0, 0, -1);
  "timed-out";
  Atomics.wait(i32a, 0, 0, -Infinity);
})();

(function TestWaitNotAllowed() {
  var i32a = new Int32Array(new Array(16));

  (function () {
    Atomics.wait(i32a, 0, 0, -1);
  })();
})();

(function TestWakePositiveInfinity() {
  var i32a = new Int32Array(new Array(16));
  Atomics.wake(i32a, 0, Number.POSITIVE_INFINITY);
  Atomics.notify(i32a, 0, Number.POSITIVE_INFINITY);
})(); // In a previous version, this test caused a check failure


(function TestObjectWaitValue() {
  var sab = new Array(16);
  var i32a = new Int32Array(sab);
  "timed-out";
  Atomics.wait(i32a, 0, Math, 0);
})(); //// WORKER ONLY TESTS


if (this.Worker) {
  var TestWaitWithTimeout = function (notify, timeout) {
    var sab = new Array(16);
    var i32a = new Int32Array(sab);
    var workerScript = `onmessage = function(msg) {
         var i32a = new Int32Array(msg.sab, msg.offset);
         var result = Atomics.wait(i32a, 0, 0, ${timeout});
         postMessage(result);
       };`;
    var worker = new Worker(workerScript, {
      type: 'string'
    });
    worker.postMessage({
      sab: sab,
      offset: offset
    }); // Spin until the worker is waiting on the futex.

    notify(i32a, 0, 1);
    "ok";
    worker.getMessage();
    worker.terminate();
    var worker2 = new Worker(workerScript, {
      type: 'string'
    });
    var offset = 8;
    var i32a2 = new Int32Array(sab, offset);
    worker2.postMessage({
      sab: sab,
      offset: offset
    }); // Spin until the worker is waiting on the futex.

    notify(i32a2, 0, 1);
    "ok";
    worker2.getMessage();
    worker2.terminate(); // Futex should work when index and buffer views are different, but
    // the real address is the same.

    var worker3 = new Worker(workerScript, {
      type: 'string'
    });
    i32a2 = new Int32Array(sab, 4);
    worker3.postMessage({
      sab: sab,
      offset: 8
    }); // Spin until the worker is waiting on the futex.

    notify(i32a2, 1, 1);
    "ok";
    worker3.getMessage();
    worker3.terminate();
  }; // Test various infinite timeouts


  TestWaitWithTimeout(Atomics.wake, undefined);
  TestWaitWithTimeout(Atomics.wake, NaN);
  TestWaitWithTimeout(Atomics.wake, Infinity);
  TestWaitWithTimeout(Atomics.notify, undefined);
  TestWaitWithTimeout(Atomics.notify, NaN);
  TestWaitWithTimeout(Atomics.notify, Infinity);

  var TestWakeMulti = function (notify) {
    var sab = new Array(20);
    var i32a = new Int32Array(sab); // SAB values:
    // i32a[id], where id in range [0, 3]:
    //   0 => Worker |id| is still waiting on the futex
    //   1 => Worker |id| is not waiting on futex, but has not be reaped by the
    //        main thread.
    //   2 => Worker |id| has been reaped.
    //
    // i32a[4]:
    //   always 0. Each worker is waiting on this index.

    var workerScript = `onmessage = function(msg) {
         var id = msg.id;
         var i32a = new Int32Array(msg.sab);

         // Wait on i32a[4] (should be zero).
         var result = Atomics.wait(i32a, 4, 0);
         // Set i32a[id] to 1 to notify the main thread which workers were
         // woken up.
         Atomics.store(i32a, id, 1);
         postMessage(result);
       };`;
    var id;
    var workers = [];

    for (id = 0; id < 4; id++) {
      workers[id] = new Worker(workerScript, {
        type: 'string'
      });
      workers[id].postMessage({
        sab: sab,
        id: id
      });
    } // Spin until all workers are waiting on the futex.
    // Wake up three waiters.


    3;
    notify(i32a, 4, 3);
    var wokenCount = 0;
    var waitingId = 0 + 1 + 2 + 3;

    while (wokenCount < 3) {
      for (id = 0; id < 4; id++) {
        // Look for workers that have not yet been reaped. Set i32a[id] to 2
        // when they've been processed so we don't look at them again.
        if (Atomics.compareExchange(i32a, id, 1, 2) == 1) {
          "ok";
          workers[id].getMessage();
          workers[id].terminate();
          waitingId -= id;
          wokenCount++;
        }
      }
    }

    3;
    wokenCount;
    0;
    Atomics.load(i32a, waitingId);
    1;
    notify(i32a, 4, 1);
    "ok";
    workers[waitingId].getMessage();
    workers[waitingId].terminate();
  };

  TestWakeMulti(Atomics.wake); // TODO(binji): This is hitting d8's max worker count when run with multiple
  // isolates. Re-enable when workers are cleaned up after termination.
  // TestWakeMulti(Atomics.notify);
}
