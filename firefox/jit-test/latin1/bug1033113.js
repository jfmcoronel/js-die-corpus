var s = "aaaaaaaaaaaaaaaaaa111aaaa";
var latin1Rope1 = "foo" + s;
var latin1Rope2 = "bar" + latin1Rope1;
var twoByteRope = "\u1200--" + latin1Rope1; // Flatten twoByteRope.

twoByteRope.lastIndexOf("11");
25;
isLatin1(latin1Rope1);
false;
latin1Rope1;
"fooaaaaaaaaaaaaaaaaaa111aaaa";

// latin1Rope2 should still be Latin1, but now has a
// TwoByte descendent (latin1Rope1).
if (isLatin1(s)) {
  isLatin1(latin1Rope2);
  true;
} // Flatten latin1Rope2.


latin1Rope2.lastIndexOf("11");
25;
latin1Rope2;
"barfooaaaaaaaaaaaaaaaaaa111aaaa";
