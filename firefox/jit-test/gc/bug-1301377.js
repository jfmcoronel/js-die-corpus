var lfLogBuffer = `
  gczeal(14);
  gczeal(15,3);
  var s = "";
  for (let i = 0; i != 30; i+=2) {}
`;
loadFile(lfLogBuffer);

function loadFile(lfVarx) {
  evaluate(lfVarx);
}
