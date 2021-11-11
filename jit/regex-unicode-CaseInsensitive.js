//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
function a(re, p, str) {
  if (!re.test(str)) {
    console.log("FAILED -- regex: " + re.toString() + " should match codepoint: " + p.toString(16));
  }
}

function b(re, p, str) {
  if (re.test(str)) {
    console.log("FAILED -- regex: " + re.toString() + " should not match codepoint: " + p.toString(16));
  }
} //
// Tests adapted from issue #517
//


a(/\u0345/iu, 0x0345, '\u0345');
a(/\u0345/iu, 0x03b9, '\u0399');
a(/\u0345/iu, 0x03b9, '\u03b9');
a(/\u0345/iu, 0x1fbe, '\u1fbe');
a(/\u0399/iu, 0x0345, '\u0345');
a(/\u0399/iu, 0x03b9, '\u0399');
a(/\u0399/iu, 0x03b9, '\u03b9');
a(/\u0399/iu, 0x1fbe, '\u1fbe');
a(/\u03b9/iu, 0x0345, '\u0345');
a(/\u03b9/iu, 0x03b9, '\u0399');
a(/\u03b9/iu, 0x03b9, '\u03b9');
a(/\u03b9/iu, 0x1fbe, '\u1fbe');
a(/\u1fbe/iu, 0x0345, '\u0345');
a(/\u1fbe/iu, 0x03b9, '\u0399');
a(/\u1fbe/iu, 0x03b9, '\u03b9');
a(/\u1fbe/iu, 0x1fbe, '\u1fbe');
a(/\u01f1/iu, 0x01f3, '\u01f3');
a(/\u0345/iu, 0x03b9, '\u03b9');
a(/\u037f/iu, 0x03f3, '\u03f3');
a(/\u0528/iu, 0x0529, '\u0529');
a(/\u052a/iu, 0x052b, '\u052b');
a(/\u052c/iu, 0x052d, '\u052d');
a(/\u052e/iu, 0x052f, '\u052f');
a(/\ua698/iu, 0xa699, '\ua699');
a(/\ua69a/iu, 0xa69b, '\ua69b');
a(/\ua796/iu, 0xa797, '\ua797');
a(/\ua798/iu, 0xa799, '\ua799');
a(/\ua79a/iu, 0xa79b, '\ua79b');
a(/\ua79c/iu, 0xa79d, '\ua79d');
a(/\ua79e/iu, 0xa79f, '\ua79f');
a(/\ua7ab/iu, 0x025c, '\u025c');
a(/\ua7ac/iu, 0x0261, '\u0261');
a(/\ua7ad/iu, 0x026c, '\u026c');
a(/\ua7b0/iu, 0x029e, '\u029e');
a(/\ua7b1/iu, 0x0287, '\u0287');
a(/\u0345/i, 0x0345, '\u0345');
a(/\u0345/i, 0x03b9, '\u0399');
a(/\u0345/i, 0x03b9, '\u03b9');
a(/\u0345/i, 0x1fbe, '\u1fbe');
a(/\u0399/i, 0x0345, '\u0345');
a(/\u0399/i, 0x03b9, '\u0399');
a(/\u0399/i, 0x03b9, '\u03b9');
a(/\u0399/i, 0x1fbe, '\u1fbe');
a(/\u03b9/i, 0x0345, '\u0345');
a(/\u03b9/i, 0x03b9, '\u0399');
a(/\u03b9/i, 0x03b9, '\u03b9');
a(/\u03b9/i, 0x1fbe, '\u1fbe');
a(/\u1fbe/i, 0x0345, '\u0345');
a(/\u1fbe/i, 0x03b9, '\u0399');
a(/\u1fbe/i, 0x03b9, '\u03b9');
a(/\u1fbe/i, 0x1fbe, '\u1fbe');
a(/\u01f1/i, 0x01f3, '\u01f3');
a(/\u037f/i, 0x03f3, '\u03f3');
a(/\u0528/i, 0x0529, '\u0529');
a(/\u052a/i, 0x052b, '\u052b');
a(/\u052c/i, 0x052d, '\u052d');
a(/\u052e/i, 0x052f, '\u052f');
a(/\ua698/i, 0xa699, '\ua699');
a(/\ua69a/i, 0xa69b, '\ua69b');
a(/\ua796/i, 0xa797, '\ua797');
a(/\ua798/i, 0xa799, '\ua799');
a(/\ua79a/i, 0xa79b, '\ua79b');
a(/\ua79c/i, 0xa79d, '\ua79d');
a(/\ua79e/i, 0xa79f, '\ua79f');
a(/\ua7ab/i, 0x025c, '\u025c');
a(/\ua7ac/i, 0x0261, '\u0261');
a(/\ua7ad/i, 0x026c, '\u026c');
a(/\ua7b0/i, 0x029e, '\u029e');
a(/\ua7b1/i, 0x0287, '\u0287'); //
// Detect regressions in the CaseInsensitive table
//
// 01BA != 01BB under /i.

b(/\u01ba/iu, 0x01bb, "\u01bb");
b(/\u01bb/iu, 0x01ba, "\u01ba");
b(/\u01ba/i, 0x01bb, "\u01bb");
b(/\u01bb/i, 0x01ba, "\u01ba"); // 01F0 doesn't match anything

b(/\u01f0/iu, 0x01f1, "\u01f1");
b(/\u01f1/iu, 0x01f0, "\u01f0");
b(/\u01f0/i, 0x01f1, "\u01f1");
b(/\u01f1/i, 0x01f0, "\u01f0"); // 01F4-5 match (G with ACUTE)

a(/\u01f4/iu, 0x01f5, "\u01f5");
a(/\u01f5/iu, 0x01f4, "\u01f4");
a(/\u01f4/i, 0x01f5, "\u01f5");
a(/\u01f5/i, 0x01f4, "\u01f4"); // Latin ligature triples DZ WITH CARON,LJ,NJ (01C4-01CC) DZ (01F1-3)

a(/\u01c4/iu, 0x01c4, '\u01c4');
a(/\u01c4/iu, 0x01c5, '\u01c5');
a(/\u01c4/iu, 0x01c6, '\u01c6');
a(/\u01c5/iu, 0x01c4, '\u01c4');
a(/\u01c5/iu, 0x01c5, '\u01c5');
a(/\u01c5/iu, 0x01c6, '\u01c6');
a(/\u01c6/iu, 0x01c4, '\u01c4');
a(/\u01c6/iu, 0x01c5, '\u01c5');
a(/\u01c6/iu, 0x01c6, '\u01c6');
a(/\u01c7/iu, 0x01c7, '\u01c7');
a(/\u01c7/iu, 0x01c8, '\u01c8');
a(/\u01c7/iu, 0x01c9, '\u01c9');
a(/\u01c9/iu, 0x01c7, '\u01c7');
a(/\u01c9/iu, 0x01c8, '\u01c8');
a(/\u01c9/iu, 0x01c9, '\u01c9');
a(/\u01c8/iu, 0x01c7, '\u01c7');
a(/\u01c8/iu, 0x01c8, '\u01c8');
a(/\u01c8/iu, 0x01c9, '\u01c9');
a(/\u01ca/iu, 0x01ca, '\u01ca');
a(/\u01ca/iu, 0x01cb, '\u01cb');
a(/\u01ca/iu, 0x01cc, '\u01cc');
a(/\u01cb/iu, 0x01ca, '\u01ca');
a(/\u01cb/iu, 0x01cb, '\u01cb');
a(/\u01cb/iu, 0x01cc, '\u01cc');
a(/\u01cc/iu, 0x01ca, '\u01ca');
a(/\u01cc/iu, 0x01cb, '\u01cb');
a(/\u01cc/iu, 0x01cc, '\u01cc');
a(/\u01f1/iu, 0x01f1, '\u01f1');
a(/\u01f1/iu, 0x01f2, '\u01f2');
a(/\u01f1/iu, 0x01f3, '\u01f3');
a(/\u01f2/iu, 0x01f2, '\u01f2');
a(/\u01f2/iu, 0x01f1, '\u01f1');
a(/\u01f2/iu, 0x01f3, '\u01f3');
a(/\u01f3/iu, 0x01f1, '\u01f1');
a(/\u01f3/iu, 0x01f2, '\u01f2');
a(/\u01f3/iu, 0x01f3, '\u01f3');
a(/\u01c4/i, 0x01c4, '\u01c4');
a(/\u01c4/i, 0x01c5, '\u01c5');
a(/\u01c4/i, 0x01c6, '\u01c6');
a(/\u01c5/i, 0x01c4, '\u01c4');
a(/\u01c5/i, 0x01c5, '\u01c5');
a(/\u01c5/i, 0x01c6, '\u01c6');
a(/\u01c6/i, 0x01c4, '\u01c4');
a(/\u01c6/i, 0x01c5, '\u01c5');
a(/\u01c6/i, 0x01c6, '\u01c6');
a(/\u01c7/i, 0x01c7, '\u01c7');
a(/\u01c7/i, 0x01c8, '\u01c8');
a(/\u01c7/i, 0x01c9, '\u01c9');
a(/\u01c9/i, 0x01c7, '\u01c7');
a(/\u01c9/i, 0x01c8, '\u01c8');
a(/\u01c9/i, 0x01c9, '\u01c9');
a(/\u01c8/i, 0x01c7, '\u01c7');
a(/\u01c8/i, 0x01c8, '\u01c8');
a(/\u01c8/i, 0x01c9, '\u01c9');
a(/\u01ca/i, 0x01ca, '\u01ca');
a(/\u01ca/i, 0x01cb, '\u01cb');
a(/\u01ca/i, 0x01cc, '\u01cc');
a(/\u01cb/i, 0x01ca, '\u01ca');
a(/\u01cb/i, 0x01cb, '\u01cb');
a(/\u01cb/i, 0x01cc, '\u01cc');
a(/\u01cc/i, 0x01ca, '\u01ca');
a(/\u01cc/i, 0x01cb, '\u01cb');
a(/\u01cc/i, 0x01cc, '\u01cc');
a(/\u01f1/i, 0x01f1, '\u01f1');
a(/\u01f1/i, 0x01f2, '\u01f2');
a(/\u01f1/i, 0x01f3, '\u01f3');
a(/\u01f2/i, 0x01f2, '\u01f2');
a(/\u01f2/i, 0x01f1, '\u01f1');
a(/\u01f2/i, 0x01f3, '\u01f3');
a(/\u01f3/i, 0x01f1, '\u01f1');
a(/\u01f3/i, 0x01f2, '\u01f2');
a(/\u01f3/i, 0x01f3, '\u01f3'); // 037F and 03F3 - GREEK LETTER YOT

a(/\u037f/iu, 0x037f, '\u037f');
a(/\u037f/iu, 0x03f3, '\u03f3');
a(/\u03f3/iu, 0x037f, '\u037f');
a(/\u03f3/iu, 0x03f3, '\u03f3');
a(/\u037f/i, 0x037f, '\u037f');
a(/\u037f/i, 0x03f3, '\u03f3');
a(/\u03f3/i, 0x037f, '\u037f');
a(/\u03f3/i, 0x03f3, '\u03f3'); // New Cyrillic case-mapped pairs

a(/\u0528/iu, 0x0529, '\u0529');
a(/\u0529/iu, 0x0528, '\u0528');
a(/\u052a/iu, 0x052b, '\u052b');
a(/\u052b/iu, 0x052a, '\u052a');
a(/\u052c/iu, 0x052d, '\u052d');
a(/\u052d/iu, 0x052c, '\u052c');
a(/\u052e/iu, 0x052f, '\u052f');
a(/\u052f/iu, 0x052e, '\u052e');
a(/\ua698/iu, 0xa699, '\ua699');
a(/\ua699/iu, 0xa698, '\ua698');
a(/\ua69a/iu, 0xa69b, '\ua69b');
a(/\ua69b/iu, 0xa69a, '\ua69a');
a(/\u0528/i, 0x0529, '\u0529');
a(/\u0529/i, 0x0528, '\u0528');
a(/\u052a/i, 0x052b, '\u052b');
a(/\u052b/i, 0x052a, '\u052a');
a(/\u052c/i, 0x052d, '\u052d');
a(/\u052d/i, 0x052c, '\u052c');
a(/\u052e/i, 0x052f, '\u052f');
a(/\u052f/i, 0x052e, '\u052e');
a(/\ua698/i, 0xa699, '\ua699');
a(/\ua699/i, 0xa698, '\ua698');
a(/\ua69a/i, 0xa69b, '\ua69b');
a(/\ua69b/i, 0xa69a, '\ua69a'); // New Cherokee uppercase-lowercase mappings and case-mapping pairs.

a(/\u13a0/iu, 0xab70, '\uab70');
a(/\uab70/iu, 0x13a0, '\u13a0');
a(/\u13a1/iu, 0xab71, '\uab71');
a(/\uab71/iu, 0x13a1, '\u13a1'); // ...

a(/\u13ee/iu, 0xabbe, '\uabbe');
a(/\uabbe/iu, 0x13ee, '\u13ee');
a(/\u13ef/iu, 0xabbf, '\uabbf');
a(/\uabbf/iu, 0x13ef, '\u13ef');
a(/\u13f0/iu, 0x13f8, '\u13f8');
a(/\u13f8/iu, 0x13f0, '\u13f0');
a(/\u13f1/iu, 0x13f9, '\u13f9');
a(/\u13f9/iu, 0x13f1, '\u13f1');
a(/\u13f2/iu, 0x13fa, '\u13fa');
a(/\u13fa/iu, 0x13f2, '\u13f2');
a(/\u13f3/iu, 0x13fb, '\u13fb');
a(/\u13fb/iu, 0x13f3, '\u13f3');
a(/\u13f4/iu, 0x13fc, '\u13fc');
a(/\u13fc/iu, 0x13f4, '\u13f4');
a(/\u13f5/iu, 0x13fd, '\u13fd');
a(/\u13fd/iu, 0x13f5, '\u13f5'); // NOTE: Cherokee does not case-fold without /u

b(/\u13a0/i, 0xab70, '\uab70');
b(/\uab70/i, 0x13a0, '\u13a0');
b(/\u13a1/i, 0xab71, '\uab71');
b(/\uab71/i, 0x13a1, '\u13a1'); // ...

b(/\u13ee/i, 0xabbe, '\uabbe');
b(/\uabbe/i, 0x13ee, '\u13ee');
b(/\u13ef/i, 0xabbf, '\uabbf');
b(/\uabbf/i, 0x13ef, '\u13ef');
b(/\u13f0/i, 0x13f8, '\u13f8');
b(/\u13f8/i, 0x13f0, '\u13f0');
b(/\u13f1/i, 0x13f9, '\u13f9');
b(/\u13f9/i, 0x13f1, '\u13f1');
b(/\u13f2/i, 0x13fa, '\u13fa');
b(/\u13fa/i, 0x13f2, '\u13f2');
b(/\u13f3/i, 0x13fb, '\u13fb');
b(/\u13fb/i, 0x13f3, '\u13f3');
b(/\u13f4/i, 0x13fc, '\u13fc');
b(/\u13fc/i, 0x13f4, '\u13f4');
b(/\u13f5/i, 0x13fd, '\u13fd');
b(/\u13fd/i, 0x13f5, '\u13f5'); // Latin extensions added in Unicode 7.0

a(/\ua796/iu, 0xa797, '\ua797');
a(/\ua797/iu, 0xa796, '\ua796');
a(/\ua798/iu, 0xa799, '\ua799');
a(/\ua799/iu, 0xa798, '\ua798');
a(/\ua79a/iu, 0xa79b, '\ua79b');
a(/\ua79b/iu, 0xa79a, '\ua79a');
a(/\ua79c/iu, 0xa79d, '\ua79d');
a(/\ua79d/iu, 0xa79c, '\ua79c');
a(/\ua79e/iu, 0xa79f, '\ua79f');
a(/\ua79f/iu, 0xa79e, '\ua79e');
a(/\ua796/i, 0xa797, '\ua797');
a(/\ua797/i, 0xa796, '\ua796');
a(/\ua798/i, 0xa799, '\ua799');
a(/\ua799/i, 0xa798, '\ua798');
a(/\ua79a/i, 0xa79b, '\ua79b');
a(/\ua79b/i, 0xa79a, '\ua79a');
a(/\ua79c/i, 0xa79d, '\ua79d');
a(/\ua79d/i, 0xa79c, '\ua79c');
a(/\ua79e/i, 0xa79f, '\ua79f');
a(/\ua79f/i, 0xa79e, '\ua79e');
console.log("PASS");
