function shouldBe(actual, expected) {
  ;
}

function test(value) {
  return !value;
}

noInline(test);
var data = [[{}, true], [true, true], [false, false], [-0, false], [1, true], [4.2, true], [NaN, false], [Infinity, true], [[], true], [new Date(), true], ["", false], ["" + "" + "", false], ["Cocoa", true], [undefined, false], [null, false], [Symbol(), true], [makeMasquerader(), false]];

for (var i = 0; i < 1e4; ++i) {
  for (let [value, result] of data) {
    shouldBe(!test(value), result);
  }
}
