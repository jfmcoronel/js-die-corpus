function testNativeSetter() {
  var re = /foo/;
  var N = 19;

  for (var i = 0; i < N; i++) {
    re.lastIndex = i;
  }

  re.lastIndex;
  N - 1;
}

testNativeSetter();
