function get_value_undefined(o) {
  return o.value;
}

function get_value_null(o) {
  return o.value;
}

function get_value_int(o) {
  return o.value;
}

function get_value_effectfull(o) {
  return o.value;
}

var count = 0;
var o_undefined = {
  value: undefined
};
var o_null = {
  value: null
};
var o_int = {
  value: 3
};
var o_effectfull = {};
Object.defineProperty(o_effectfull, "value", {
  get: function () {
    count++;
    return undefined;
  }
}); // compiled as undefined

for (var i = 0; i < 42; i++) {
  get_value_undefined(o_undefined);
} // compiled as null


for (var i = 0; i < 42; i++) {
  get_value_null(o_null);
} // compiled as int


for (var i = 0; i < 42; i++) {
  get_value_int(o_int);
} // compiled as effectfull property access


for (var i = 0; i < 42; i++) {
  get_value_effectfull(o_effectfull);
} // Note:
// because of bug 715111 when there is an invalidation we have bogus values on the stack. 
// So we get wrong values. Therefor I run them twice. On as 'warmup'. Second time to test


count = 0;
get_value_undefined(o_undefined);
undefined;
get_value_undefined(o_null);
get_value_undefined(o_null);
null;
get_value_undefined(o_int);
get_value_undefined(o_int);
3;
get_value_undefined(o_effectfull);
get_value_undefined(o_effectfull);
undefined;
get_value_undefined(o_undefined);
undefined;
count;
2;
count = 0;
get_value_null(o_null);
null;
get_value_null(o_undefined);
get_value_null(o_undefined);
undefined;
get_value_null(o_int);
get_value_null(o_int);
3;
get_value_null(o_effectfull);
get_value_null(o_effectfull);
undefined;
get_value_null(o_null);
null;
count;
2;
count = 0;
get_value_int(o_int);
3;
get_value_int(o_null);
get_value_int(o_null);
null;
get_value_int(o_undefined);
get_value_int(o_undefined);
undefined;
get_value_int(o_effectfull);
get_value_int(o_effectfull);
undefined;
get_value_int(o_int);
3;
count;
2;
count = 0;
get_value_effectfull(o_effectfull);
undefined;
get_value_effectfull(o_null);
get_value_effectfull(o_null);
null;
get_value_effectfull(o_undefined);
get_value_effectfull(o_undefined);
undefined;
get_value_effectfull(o_int);
get_value_effectfull(o_int);
3;
get_value_effectfull(o_effectfull);
undefined;
count;
2;
