/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//-----------------------------------------------------------------------------
var BUGNUMBER = 472533;
var summary = 'Do not crash with loop, replace, regexp';
var actual = '';
var expect = ''; //-----------------------------------------------------------------------------

test(); //-----------------------------------------------------------------------------

function test() {
  printBugNumber(BUGNUMBER);
  printStatus(summary);

  for (var j = 0; j < 4; ++j) {
    ''.replace('', /x/);
  }

  reportCompare(expect, actual, summary);
}
