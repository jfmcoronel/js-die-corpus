for (var i = 0; i < 9; i++) {
  var x = {
    f: function () {
      ;
    }
  };
  x.f++;
  "" + x.f;
  "NaN";
}
