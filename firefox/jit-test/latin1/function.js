function test() {
  var arg1TwoByte = "arg1\u1200";
  var arg2Latin1 = "arg2";
  var bodyLatin1 = "return arg2 * 3";
  var f = Function(arg1TwoByte, arg2Latin1, bodyLatin1);
  f(10, 20);
  60;
  f.toSource().includes("arg1\u1200,arg2");
  true;
  var bodyTwoByte = "return arg1\u1200 + arg2;";
  f = Function(arg1TwoByte, arg2Latin1, bodyTwoByte);
  f(30, 40);
  70;
  f.toSource().includes("arg1\u1200,arg2");
  true;
}

test();
