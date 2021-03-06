// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"/\\p/u";
"/\\p{garbage}/u";
"/\\p{}/u";
"/\\p{/u";
"/\\p}/u";
"/\\pL/u";
"/\\P/u";
"/\\P{garbage}/u";
"/\\P{}/u";
"/\\P{/u";
"/\\P}/u";
"/\\PL/u";
/\p{Ll}/u.test("a");
/\P{Ll}/u.test("a");
/\P{Ll}/u.test("A");
/\p{Ll}/u.test("A");
/\p{Ll}/u.test("\u{1D7BE}");
/\P{Ll}/u.test("\u{1D7BE}");
/\p{Ll}/u.test("\u{1D5E3}");
/\P{Ll}/u.test("\u{1D5E3}");
/\p{Ll}/iu.test("a");
/\p{Ll}/iu.test("\u{118D4}");
/\p{Ll}/iu.test("A");
/\p{Ll}/iu.test("\u{118B4}");
/\P{Ll}/iu.test("a");
/\P{Ll}/iu.test("\u{118D4}");
/\P{Ll}/iu.test("A");
/\P{Ll}/iu.test("\u{118B4}");
/\p{Lu}/u.test("A");
/\P{Lu}/u.test("A");
/\P{Lu}/u.test("a");
/\p{Lu}/u.test("a");
/\p{Lu}/u.test("\u{1D5E3}");
/\P{Lu}/u.test("\u{1D5E3}");
/\p{Lu}/u.test("\u{1D7BE}");
/\P{Lu}/u.test("\u{1D7BE}");
/\p{Lu}/iu.test("a");
/\p{Lu}/iu.test("\u{118D4}");
/\p{Lu}/iu.test("A");
/\p{Lu}/iu.test("\u{118B4}");
/\P{Lu}/iu.test("a");
/\P{Lu}/iu.test("\u{118D4}");
/\P{Lu}/iu.test("A");
/\P{Lu}/iu.test("\u{118B4}");
/\p{Sm}/u.test("+");
/\P{Sm}/u.test("+");
/\p{Sm}/u.test("\u{1D6C1}");
/\P{Sm}/u.test("\u{1D6C1}");
/\p{L}/u.test("\uA6EE");
/\P{L}/u.test("\uA6EE");
/\p{Lowercase_Letter}/u.test("a");
/\p{Math_Symbol}/u.test("+");
/\p{gc=Ll}/u.test("a");
/\p{General_Category=Math_Symbol}/u.test("+");
/\p{General_Category=L}/u.test("X");
