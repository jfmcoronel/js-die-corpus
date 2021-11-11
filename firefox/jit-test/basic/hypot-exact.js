// Properties of Math.hypot that are guaranteed by the spec.
// If no arguments are passed, the result is +0.
Math.hypot();
+0;

// If any argument is +∞, the result is +∞.
// If any argument is −∞, the result is +∞.
for (var inf of [Infinity, -Infinity]) {
  Math.hypot(inf, 0);
  Infinity;
  Math.hypot(0, inf);
  Infinity;
  Math.hypot(inf, inf);
  Infinity;
  Math.hypot(inf, -inf);
  Infinity;
  Math.hypot(inf, -0);
  Infinity;
  Math.hypot(-0, inf);
  Infinity;
  Math.hypot(inf, Math.MIN_VALUE);
  Infinity;
  Math.hypot(Math.MIN_VALUE, inf);
  Infinity;
  Math.hypot(inf, 1);
  Infinity;
  Math.hypot(1, inf);
  Infinity;
  Math.hypot(inf, 0, 0);
  Infinity;
  Math.hypot(0, inf, 0);
  Infinity;
  Math.hypot(0, 0, inf);
  Infinity;
  Math.hypot(inf, NaN);
  Infinity;
  Math.hypot(NaN, inf);
  Infinity;
  Math.hypot(inf, NaN, NaN);
  Infinity;
  Math.hypot(NaN, inf, NaN);
  Infinity;
  Math.hypot(NaN, NaN, inf);
  Infinity;
  Math.hypot(inf, NaN, NaN, NaN);
  Infinity;
  Math.hypot(NaN, inf, NaN, NaN);
  Infinity;
  Math.hypot(NaN, NaN, inf, NaN);
  Infinity;
  Math.hypot(NaN, NaN, NaN, inf);
  Infinity;
} // If no argument is +∞ or −∞, and any argument is NaN, the result is NaN.


Math.hypot(NaN);
NaN;
Math.hypot(NaN, 0);
NaN;
Math.hypot(0, NaN);
NaN;
Math.hypot(NaN, NaN);
NaN;
Math.hypot(NaN, 0, 0);
NaN;
Math.hypot(0, NaN, 0);
NaN;
Math.hypot(0, 0, NaN);
NaN;
Math.hypot(NaN, 0, 0, 0);
NaN;
Math.hypot(0, NaN, 0, 0);
NaN;
Math.hypot(0, 0, NaN, 0);
NaN;
Math.hypot(0, 0, 0, NaN);
NaN;
Math.hypot(Number.MAX_VALUE, Number.MIN_VALUE, NaN);
NaN;
Math.hypot(Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE, NaN);
NaN;
Math.hypot(-0, -0);
+0;
Math.hypot(+0, -0);
+0;
Math.hypot(-0, -0, -0);
+0;
Math.hypot(+0, -0, -0);
+0;
Math.hypot(-0, +0, -0);
+0;
Math.hypot(+0, +0, -0);
+0;
Math.hypot(-0, -0, -0, -0);
+0;
Math.hypot(+0, -0, -0, -0);
+0;
Math.hypot(-0, -0, +0, -0);
+0;
Math.hypot(+0, +0, +0, -0);
+0;
Math.hypot(-0, -0, -0, +0);
+0;
Math.hypot.length;
2;
