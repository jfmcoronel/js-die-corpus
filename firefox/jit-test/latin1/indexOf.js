function toLatin1(s) {
  isLatin1(s);
  true;
  return s;
}

function testLastIndexOf() {
  var s1 = toLatin1("abcdefgh123456\u0081defg");
  var s2 = toLatin1("456\u0081de"); // Latin1 + Latin1

  s1.lastIndexOf(s1);
  0;
  s1.lastIndexOf(s2);
  11;
  s1.lastIndexOf(s2, 10);
  -1;
  s2.lastIndexOf(s1);
  -1;
  s1.lastIndexOf("abc\u1234");
  -1;
  s1.lastIndexOf("def\u1234".substring(0, 3));
  15;
  s1.lastIndexOf("def\u1234".substring(0, 3), 9);
  3;
  // TwoByte + Latin1
  var s3 = "123456\u0081defg\u1123a456\u0081defg";
  isLatin1(s2);
  true;
  s3.lastIndexOf(s2);
  13;
  s3.lastIndexOf(s2, 12);
  3;
  s3.lastIndexOf(toLatin1("defg7"));
  -1;
  s3.lastIndexOf("\u1123a4");
  11;
  s3.lastIndexOf("\u1123a4", 10);
  -1;
  s3.lastIndexOf("\u1123a\u1098");
  -1;
  s3.lastIndexOf(s3);
  0;
}

testLastIndexOf();

function testIndexOf() {
  var s1 = toLatin1("abcdefgh123456d\u00AAefghi");
  var s2 = toLatin1("456d\u00AA"); // Latin1 + Latin1

  s1.indexOf(s1);
  0;
  s1.indexOf(s2);
  11;
  s1.indexOf(s2, 12);
  -1;
  s2.indexOf(s1);
  -1;
  s1.indexOf("abc\u1234");
  -1;
  s1.indexOf("def\u1234".substring(0, 3));
  3;
  s1.indexOf("d\u00AAef\u1234".substring(0, 3), 9);
  14;
  // TwoByte + Latin1
  var s3 = "123456d\u00AAefg\u1123a456d\u00AAefg";
  isLatin1(s2);
  true;
  s3.indexOf(s2);
  3;
  s3.indexOf(s2, 11);
  13;
  s3.indexOf(toLatin1("d\u00AAefg7"));
  -1;
  s3.indexOf("\u1123a4");
  11;
  s3.indexOf("\u1123a4", 12);
  -1;
  s3.indexOf("\u1123a\u1098");
  -1;
  s3.indexOf(s3);
  0;
}

testIndexOf();

function testincludes() {
  var s1 = toLatin1("abcdefgh123456defghi\u00EEj");
  var s2 = toLatin1("456defghi\u00EE"); // Latin1 + Latin1

  s1.includes(s1);
  true;
  s1.includes(s2);
  true;
  s1.includes(s2, 12);
  false;
  s2.includes(s1);
  false;
  s1.includes("abc\u1234");
  false;
  s1.includes("def\u1234".substring(0, 3));
  true;
  s1.includes("def\u1234".substring(0, 3), 9);
  true;
  // TwoByte + Latin1
  var s3 = "123456defg\u1123a456defghi\u00EEj";
  isLatin1(s2);
  true;
  s3.includes(s2);
  true;
  s3.includes(s2, 13);
  false;
  s3.includes(toLatin1("defg8"));
  false;
  s3.includes("\u1123a4");
  true;
  s3.includes("\u1123a4", 11);
  false;
  s3.includes("\u1123a\u1098");
  false;
  s3.includes(s3);
  true;
}

testincludes();

function testIndexOfBMH() {
  // BoyerMooreHorspool algorithm is used for large strings.
  var s = "012345678901234567890123456789".repeat(20);
  var text = s + "abcdefghijklmnopqrst\u00C1uvwxyz";
  text.indexOf("333");
  var textL1 = toLatin1(text);
  var patL1 = toLatin1("cdefghijklmnopqrst\u00C1uvwx"); // Latin1 + Latin1

  textL1.indexOf(patL1);
  602;
  textL1.indexOf(patL1, 603);
  -1;
  textL1.indexOf(textL1);
  0;
  textL1.indexOf("cdefghijklmnopqrst\u00C1uvwxy");
  602;
  textL1.indexOf("cdefghijklmnopqrst\u00C1uvwxy", 603);
  -1;
  textL1.indexOf("cdefghijklmnopqrst\u00C1uvwxy\uaa00", -1);
  -1;
  // TwoByte + Latin1
  var textTB = s + "abcdefghijklmnopqrst\u00C1uvwxyz\u1200";
  text.indexOf("333");
  textTB.indexOf(patL1);
  602;
  textTB.indexOf(patL1, 603);
  -1;
  textTB.indexOf("defghijklmnopqrst\u00C1uvwxyz\u1200");
  603;
  textTB.indexOf("defghijklmnopqrst\u00C1uvwxyz\u1200", 604);
  -1;
  textTB.indexOf("defghijklmnopqrst\u00C1uvwxyz\u1201");
  -1;
}

testIndexOfBMH();

function testIndexOfLargePattern() {
  // If the pattern length > 128, memcmp is used (text length has to be < 512
  // or we'll use BoyerMooreHorspool). This is only valid if both
  // strings have the same encoding.
  var text = "012345678901234567890123456789".repeat(10) + "abcdefghijklmnopqrst\u00C1uvwxyz";
  text.indexOf("333"); // flatten

  var pat = "012345678901234567890123456789".repeat(5) + "abcdefghijklmnopqr";
  pat.indexOf("333"); // flatten
  // Latin1 + Latin1

  text = toLatin1(text);
  pat = toLatin1(pat);
  text.indexOf(pat);
  150;
  text.indexOf(pat + "\u1200");
  -1;
  text.indexOf((pat + "\u1200").slice(0, -1));
  150;
  // TwoByte + Latin1
  text = text + "\u1100";
  isLatin1(pat);
  true;
  text.indexOf(pat);
  150;
  // TwoByte + TwoByte
  pat = pat + "st\u00C1uvwxyz\u1100";
  text.indexOf(pat);
  150;
  text.indexOf(pat + "\u2000");
  -1;
}

testIndexOfLargePattern();
