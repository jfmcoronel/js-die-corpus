//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
// WOOB 1147829 - these cause a crash in the compat regex engine, but they don't repro the crash most of the time
match(/^a/m, "b");
match(/$a?/m, ""); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function measureTime(f) {
  var d = new Date();
  f();
  print(new Date() - d);
}

function myToString(o, quoteStrings) {
  switch (o) {
    case null:
    case undefined:
      return "" + o;
  }

  switch (typeof o) {
    case "boolean":
      return "" + o;

    case "number":
      {
        var s = "" + o;
        var e = s.indexOf("e");

        for (var i = (e == -1 ? s.length : e) - 3; i > 0; i -= 3) {
          s = s.substring(0, i) + "," + s.substring(i);
        }

        return s;
      }

    case "string":
      {
        var hex = "0123456789abcdef";
        var s = "";

        for (var i = 0; i < o.length; ++i) {
          var c = o.charCodeAt(i);

          switch (c) {
            case 0x0:
              s += "\\0";
              continue;

            case 0x8:
              s += "\\b";
              continue;

            case 0xb:
              s += "\\v";
              continue;

            case 0xc:
              s += "\\f";
              continue;
          }

          if (quoteStrings) {
            switch (c) {
              case 0x9:
                s += "\\t";
                continue;

              case 0xa:
                s += "\\n";
                continue;

              case 0xd:
                s += "\\r";
                continue;

              case 0x22:
                s += "\\\"";
                continue;

              case 0x5c:
                s += "\\\\";
                continue;
            }
          }

          if (c >= 0x20 && c < 0x7f) {
            s += o.charAt(i);
          } else {
            if (c <= 0xff) {
              s += "\\x" + hex.charAt(c >> 4 & 0xf) + hex.charAt(c & 0xf);
            } else {
              s += "\\u" + hex.charAt(c >> 12 & 0xf) + hex.charAt(c >> 8 & 0xf) + hex.charAt(c >> 4 & 0xf) + hex.charAt(c & 0xf);
            }
          }
        }

        if (quoteStrings) {
          s = "\"" + s + "\"";
        }

        return s;
      }

    case "object":
    case "function":
      break;

    default:
      return "<unknown type '" + typeof o + "'>";
  }

  if (o instanceof Array) {
    var s = "[";

    for (var i = 0; i < o.length; ++i) {
      if (i) {
        s += ", ";
      }

      s += myToString(o[i], true);
    }

    return s + "]";
  }

  if (o instanceof Error) {
    return o.name + ": " + o.message;
  }

  if (o instanceof RegExp) {
    return o.toString() + (o.lastIndex === 0 ? "" : " (lastIndex: " + o.lastIndex + ")");
  }

  return "" + o;
}

function safeCall(f) {
  var args = [];

  for (var a = 1; a < arguments.length; ++a) {
    args.push(arguments[a]);
  }

  try {
    return f.apply(this, args);
  } catch (ex) {
    print(ex);
  }
} ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function exec(r, s) {
  print("exec(", r, ", ", myToString(s, true), ");");
  var result = r.exec(s);
  print(result);
  return result;
}

function test(r, s) {
  print("test(", r, ", ", myToString(s, true), ");");
  var result = r.test(s);
  print(result);
  return result;
}

function match(r, s) {
  print("match(", r, ", ", myToString(s, true), ");");
  var result = s.match(r);
  print(result);
  return result;
}

function replace(r, s, w) {
  print("replace(", myToString(r, true), ", ", myToString(s, true), ", ", myToString(w, true), ");");
  var result = s.replace(r, w);
  print(result);
  return result;
}

function split(r, s) {
  print("split(", r, ", ", myToString(s, true), ");");
  var result = s.split(r);
  print(result);
  return result;
}

function search(r, s) {
  print("search(", r, ", ", myToString(s, true), ");");
  var result = s.search(r);
  print(result);
  return result;
}
