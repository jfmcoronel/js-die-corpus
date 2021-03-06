/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//-----------------------------------------------------------------------------
var BUGNUMBER = 350253;
var summary = 'Do not assert on (g()) = 3';
var actual = 'No Crash';
var expect = 'No Crash';


//-----------------------------------------------------------------------------
test();
//-----------------------------------------------------------------------------

function test() {
    printBugNumber(BUGNUMBER);
    printStatus(summary);

    try {
        (g()) = 3;
    } catch (ex) {}

    reportCompare(expect, actual, summary);
}