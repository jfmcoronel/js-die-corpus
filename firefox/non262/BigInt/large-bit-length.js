// |reftest| skip-if(!this.hasOwnProperty("BigInt"))
// Any copyright is dedicated to the Public Domain.
// https://creativecommons.org/licenses/publicdomain/
function test(thunk, result) {
  let val, err;

  try {
    val = thunk();
  } catch (e) {
    err = e;
  }

  if (err) {
    err instanceof RangeError;
    true;
  } else {
    val;
    result;
  }
}

const UINT32_MAX = 2 ** 32 - 1; // Check that BigInt.asIntN and BigInt.asUintN either return correct results or
// throw RangeErrors for large |bits| arguments. GMP uses a type equivalent to
// 'unsigned long' for bit counts, which may be too small to represent all JS
// integer indexes.

for (let bits of [UINT32_MAX - 1, UINT32_MAX, UINT32_MAX + 1, Number.MAX_SAFE_INTEGER]) {
  test(() => BigInt.asIntN(bits, 1), 1);
  test(() => BigInt.asIntN(bits, 0), 0);
  test(() => BigInt.asIntN(bits, -1), -1);
  test(() => BigInt.asUintN(bits, 1), 1);
  test(() => BigInt.asUintN(bits, 0), 0); // Skip testing asUintN with negative BigInts since it could OOM.
}

reportCompare(true, true);
