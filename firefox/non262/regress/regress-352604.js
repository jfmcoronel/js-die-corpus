/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//-----------------------------------------------------------------------------
var BUGNUMBER = 352604;
var summary = 'Do not assert: !OBJ_GET_PROTO(cx, ctor)';
var actual = 'No Crash';
var expect = 'No Crash'; //-----------------------------------------------------------------------------

test(); //-----------------------------------------------------------------------------

function test() {
  printBugNumber(BUGNUMBER);
  printStatus(summary);
  delete Function;

  var x = function () {
    ;
  };

  reportCompare(expect, actual, summary);
}
