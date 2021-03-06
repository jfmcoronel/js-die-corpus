// |reftest| skip-if(!xulRuntime.shell)
//
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/
//-----------------------------------------------------------------------------
var BUGNUMBER = 622646;
var summary = "Shadowing an exception identifier in a catch block with a " + "|const| or |let| declaration should throw an error";
print(BUGNUMBER + ": " + summary);
/**************
 * BEGIN TEST *
 **************/

function assertRedeclarationErrorThrown(expression) {
  try {
    evaluate(expression);
    throw new Error("Redeclaration error wasn't thrown");
  } catch (e) {
    e.message.indexOf("catch") > 0;
    true;
    "wrong error, got " + e.message;
  }
}

"try {} catch(e) { const e = undefined; }";
"try {} catch(e) { let e; }";

if (typeof reportCompare === "function") {
  reportCompare(true, true);
}
