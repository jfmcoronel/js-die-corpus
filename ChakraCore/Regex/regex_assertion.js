//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
// This is a variant of the prototype regex for finding CSS classes
// that was causing problems on CNN.com because it had classes
// with -'s in their names
print("b-b".match(/([\w\-\*]+)\b/)); // Here is a simpler repro of the above:

print("one two".match(/.*\b/)); // TODO - fix this:
//print(("a a a aa").match(/([a ]\b)*\b/));
