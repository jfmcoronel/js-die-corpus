// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Largely ported from
// https://github.com/tc39/Array.prototype.includes/tree/master/test
// using https://www.npmjs.org/package/test262-to-mjsunit with further edits
// Array.prototype.includes sees a new element added by a getter that is hit
// during iteration
(function () {
  var arrayLike = {
    length: 5,
    0: "a",

    get 1() {
      this[2] = "c";
      return "b";
    }

  };
  Array.prototype.includes.call(arrayLike, "c");
})(); // Array.prototype.includes works on array-like objects


(function () {
  var arrayLike1 = {
    length: 5,
    0: "a",
    1: "b"
  };
  Array.prototype.includes.call(arrayLike1, "a");
  Array.prototype.includes.call(arrayLike1, "c");
  var arrayLike2 = {
    length: 2,
    0: "a",
    1: "b",
    2: "c"
  };
  Array.prototype.includes.call(arrayLike2, "b");
  Array.prototype.includes.call(arrayLike2, "c");
})(); // Array.prototype.includes should fail if used on a null or undefined this


(function () {
  (function () {
    Array.prototype.includes.call(null, "a");
  })();

  TypeError;

  (function () {
    Array.prototype.includes.call(undefined, "a");
  })();

  TypeError;
})(); // Array.prototype.includes should terminate if getting an index throws an
// exception


(function () {
  function Test262Error() {
    ;
  }

  var trappedZero = {
    length: 2,

    get 0() {
      throw new Test262Error();
    },

    get 1() {
      "Should not try to get the first element";
    }

  };

  (function () {
    Array.prototype.includes.call(trappedZero, "a");
  })();

  Test262Error();
})(); // Array.prototype.includes should terminate if ToNumber ends up being called on
// a symbol fromIndex


(function () {
  var trappedZero = {
    length: 1,

    get 0() {
      "Should not try to get the zeroth element";
    }

  };

  (function () {
    Array.prototype.includes.call(trappedZero, "a", Symbol());
  })();

  TypeError;
})(); // Array.prototype.includes should terminate if an exception occurs converting
// the fromIndex to a number


(function () {
  function Test262Error() {
    ;
  }

  var fromIndex = {
    valueOf: function () {
      throw new Test262Error();
    }
  };
  var trappedZero = {
    length: 1,

    get 0() {
      "Should not try to get the zeroth element";
    }

  };

  (function () {
    Array.prototype.includes.call(trappedZero, "a", fromIndex);
  })();

  Test262Error();
})(); // Array.prototype.includes should terminate if an exception occurs getting the
// length


(function () {
  function Test262Error() {
    ;
  }

  var fromIndexTrap = {
    valueOf: function () {
      "Should not try to call ToInteger on valueOf";
    }
  };
  var throwingLength = {
    get length() {
      throw new Test262Error();
    },

    get 0() {
      "Should not try to get the zeroth element";
    }

  };

  (function () {
    Array.prototype.includes.call(throwingLength, "a", fromIndexTrap);
  })();

  Test262Error();
})(); // Array.prototype.includes should terminate if ToLength ends up being called on
// a symbol length


(function () {
  var fromIndexTrap = {
    valueOf: function () {
      "Should not try to call ToInteger on valueOf";
    }
  };
  var badLength = {
    length: Symbol(),

    get 0() {
      "Should not try to get the zeroth element";
    }

  };

  (function () {
    Array.prototype.includes.call(badLength, "a", fromIndexTrap);
  })();

  TypeError;
})(); // Array.prototype.includes should terminate if an exception occurs converting
// the length to a number


(function () {
  function Test262Error() {
    ;
  }

  var fromIndexTrap = {
    valueOf: function () {
      "Should not try to call ToInteger on valueOf";
    }
  };
  var badLength = {
    length: {
      valueOf: function () {
        throw new Test262Error();
      }
    },

    get 0() {
      "Should not try to get the zeroth element";
    }

  };

  (function () {
    Array.prototype.includes.call(badLength, "a", fromIndexTrap);
  })();

  Test262Error();
})(); // Array.prototype.includes should search the whole array, as the optional
// second argument fromIndex defaults to 0


(function () {
  [10, 11].includes(10);
  [10, 11].includes(11);
  var arrayLike = {
    length: 2,

    get 0() {
      return "1";
    },

    get 1() {
      return "2";
    }

  };
  Array.prototype.includes.call(arrayLike, "1");
  Array.prototype.includes.call(arrayLike, "2");
})(); // Array.prototype.includes returns false if fromIndex is greater or equal to
// the length of the array


(function () {
  [1, 2].includes(2, 3);
  [1, 2].includes(2, 2);
  var arrayLikeWithTrap = {
    length: 2,

    get 0() {
      "Getter for 0 was called";
    },

    get 1() {
      "Getter for 1 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTrap, "c", 2);
  Array.prototype.includes.call(arrayLikeWithTrap, "c", 3);
})(); // Array.prototype.includes searches the whole array if the computed index from
// the given negative fromIndex argument is less than 0


(function () {
  [1, 3].includes(1, -4);
  [1, 3].includes(3, -4);
  var arrayLike = {
    length: 2,
    0: "a",

    get 1() {
      return "b";
    },

    get "-1"() {
      "Should not try to get the element at index -1";
    }

  };
  Array.prototype.includes.call(arrayLike, "a", -4);
  Array.prototype.includes.call(arrayLike, "b", -4);
})(); // Array.prototype.includes should use a negative value as the offset from the
// end of the array to compute fromIndex


(function () {
  [12, 13].includes(13, -1);
  [12, 13].includes(12, -1);
  [12, 13].includes(12, -2);
  var arrayLike = {
    length: 2,

    get 0() {
      return "a";
    },

    get 1() {
      return "b";
    }

  };
  Array.prototype.includes.call(arrayLike, "b", -1);
  Array.prototype.includes.call(arrayLike, "a", -1);
  Array.prototype.includes.call(arrayLike, "a", -2);
})(); // Array.prototype.includes converts its fromIndex parameter to an integer


(function () {
  ["a", "b"].includes("a", 2.3);
  var arrayLikeWithTraps = {
    length: 2,

    get 0() {
      "Getter for 0 was called";
    },

    get 1() {
      "Getter for 1 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTraps, "c", 2.1);
  Array.prototype.includes.call(arrayLikeWithTraps, "c", +Infinity);
  ["a", "b", "c"].includes("a", +Infinity);
  ["a", "b", "c"].includes("a", -Infinity);
  ["a", "b", "c"].includes("c", 2.9);
  ["a", "b", "c"].includes("c", NaN);
  var arrayLikeWithTrapAfterZero = {
    length: 2,

    get 0() {
      return "a";
    },

    get 1() {
      "Getter for 1 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTrapAfterZero, "a", NaN);
  var numberLike = {
    valueOf: function () {
      return 2;
    }
  };
  ["a", "b", "c"].includes("a", numberLike);
  ["a", "b", "c"].includes("a", "2");
  ["a", "b", "c"].includes("c", numberLike);
  ["a", "b", "c"].includes("c", "2");
})(); // Array.prototype.includes should have length 1


(function () {
  1;
  Array.prototype.includes.length;
})(); // Array.prototype.includes should have name property with value 'includes'


(function () {
  "includes";
  Array.prototype.includes.name;
})(); // !!! Test failed to convert:
// Cannot convert tests with includes.
// !!!
// Array.prototype.includes does not skip holes; if the array has a prototype it
// gets from that


(function () {
  var holesEverywhere = [,,,];
  holesEverywhere.__proto__ = {
    1: "a"
  };
  holesEverywhere.__proto__.__proto__ = Array.prototype;
  holesEverywhere.includes("a");
  var oneHole = ["a", "b",, "d"];
  oneHole.__proto__ = {
    get 2() {
      return "c";
    }

  };
  Array.prototype.includes.call(oneHole, "c");
})(); // Array.prototype.includes does not skip holes; instead it treates them as
// undefined


(function () {
  [,,,].includes(undefined);
  ["a", "b",, "d"].includes(undefined);
})(); // Array.prototype.includes gets length property from the prototype if it's
// available


(function () {
  var proto = {
    length: 1
  };
  var arrayLike = Object.create(proto);
  arrayLike[0] = "a";
  Object.defineProperty(arrayLike, "1", {
    get: function () {
      "Getter for 1 was called";
    }
  });
  Array.prototype.includes.call(arrayLike, "a");
})(); // Array.prototype.includes treats a missing length property as zero


(function () {
  var arrayLikeWithTraps = {
    get 0() {
      "Getter for 0 was called";
    },

    get 1() {
      "Getter for 1 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTraps, "a");
})(); // Array.prototype.includes should always return false on negative-length
// objects


(function () {
  Array.prototype.includes.call({
    length: -1
  }, 2);
  Array.prototype.includes.call({
    length: -2
  });
  Array.prototype.includes.call({
    length: -Infinity
  }, undefined);
  Array.prototype.includes.call({
    length: -Math.pow(2, 53)
  }, NaN);
  Array.prototype.includes.call({
    length: -1,
    "-1": 2
  }, 2);
  Array.prototype.includes.call({
    length: -3,
    "-1": 2
  }, 2);
  Array.prototype.includes.call({
    length: -Infinity,
    "-1": 2
  }, 2);
  var arrayLikeWithTrap = {
    length: -1,

    get 0() {
      "Getter for 0 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTrap, 2);
})(); // Array.prototype.includes should clamp positive lengths to 2^53 - 1


(function () {
  var fromIndexForLargeIndexTests = 9007199254740990;
  Array.prototype.includes.call({
    length: 1
  }, 2);
  Array.prototype.includes.call({
    length: 1,
    0: "a"
  }, "a");
  Array.prototype.includes.call({
    length: +Infinity,
    0: "a"
  }, "a");
  Array.prototype.includes.call({
    length: +Infinity
  }, "a", fromIndexForLargeIndexTests);
  var arrayLikeWithTrap = {
    length: +Infinity,

    get 9007199254740992() {
      "Getter for 9007199254740992 (i.e. 2^53) was called";
    },

    "9007199254740993": "a"
  };
  Array.prototype.includes.call(arrayLikeWithTrap, "a", fromIndexForLargeIndexTests);
  var arrayLikeWithTooBigLength = {
    length: 9007199254740996,
    "9007199254740992": "a"
  };
  Array.prototype.includes.call(arrayLikeWithTooBigLength, "a", fromIndexForLargeIndexTests);
})(); // Array.prototype.includes should always return false on zero-length objects


(function () {
  [].includes(2);
  [].includes();
  [].includes(undefined);
  [].includes(NaN);
  Array.prototype.includes.call({
    length: 0
  }, 2);
  Array.prototype.includes.call({
    length: 0
  });
  Array.prototype.includes.call({
    length: 0
  }, undefined);
  Array.prototype.includes.call({
    length: 0
  }, NaN);
  Array.prototype.includes.call({
    length: 0,
    0: 2
  }, 2);
  Array.prototype.includes.call({
    length: 0,
    0: undefined
  });
  Array.prototype.includes.call({
    length: 0,
    0: undefined
  }, undefined);
  Array.prototype.includes.call({
    length: 0,
    0: NaN
  }, NaN);
  var arrayLikeWithTrap = {
    length: 0,

    get 0() {
      "Getter for 0 was called";
    }

  };
  Array.prototype.includes.call(arrayLikeWithTrap);
  var trappedFromIndex = {
    valueOf: function () {
      "Should not try to convert fromIndex to a number on a zero-length array";
    }
  };
  [].includes("a", trappedFromIndex);
  Array.prototype.includes.call({
    length: 0
  }, trappedFromIndex);
})(); // Array.prototype.includes works on objects


(function () {
  ["a", "b", "c"].includes({});
  [{}, {}].includes({});
  var obj = {};
  [obj].includes(obj);
  [obj].includes(obj, 1);
  [obj, obj].includes(obj, 1);
  var stringyObject = {
    toString: function () {
      return "a";
    }
  };
  ["a", "b", obj].includes(stringyObject);
})(); // Array.prototype.includes does not see an element removed by a getter that is
// hit during iteration


(function () {
  var arrayLike = {
    length: 5,
    0: "a",

    get 1() {
      delete this[2];
      return "b";
    },

    2: "c"
  };
  Array.prototype.includes.call(arrayLike, "c");
})(); // Array.prototype.includes accesses out-of-bounds if length is changed late.


(function () {
  let arr = [1, 2, 3];
  arr.includes(undefined, {
    toString: function () {
      arr.length = 0;
      return 0;
    }
  });
  arr = [1, 2, 3];
  arr.includes(undefined, {
    toString: function () {
      arr.length = 0;
      return 10;
    }
  });
  arr = [1, 2, 3];
  arr.includes(4, {
    toString: function () {
      arr.push(4);
      return 0;
    }
  });
})(); // Array.prototype.includes should use the SameValueZero algorithm to compare


(function () {
  [1, 2, 3].includes(2);
  [1, 2, 3].includes(4);
  [1, 2, NaN].includes(NaN);
  [1, 2, -0].includes(+0);
  [1, 2, -0].includes(-0);
  [1, 2, +0].includes(-0);
  [1, 2, +0].includes(+0);
  [1, 2, -Infinity].includes(+Infinity);
  [1, 2, -Infinity].includes(-Infinity);
  [1, 2, +Infinity].includes(-Infinity);
  [1, 2, +Infinity].includes(+Infinity);
})(); // Array.prototype.includes stops once it hits the length of an array-like, even
// if there are more after


(function () {
  var arrayLike = {
    length: 2,
    0: "a",
    1: "b",

    get 2() {
      "Should not try to get the second element";
    }

  };
  Array.prototype.includes.call(arrayLike, "c");
})(); // Array.prototype.includes works on typed arrays


(function () {
  Array.prototype.includes.call(new Uint8Array([1, 2, 3]), 2);
  Array.prototype.includes.call(new Float32Array([2.5, 3.14, Math.PI]), 3.1415927410125732);
  Array.prototype.includes.call(new Uint8Array([1, 2, 3]), 4);
  Array.prototype.includes.call(new Uint8Array([1, 2, 3]), 2, 2);
})();

(function testUnscopable() {
  Array.prototype[Symbol.unscopables].includes;
})();
