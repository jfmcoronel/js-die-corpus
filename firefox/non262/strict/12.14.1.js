/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

/*
 * In strict mode, the identifier bound by a 'catch' clause may not
 * be 'eval' or 'arguments'.
 */
testLenientAndStrict('try{}catch(eval){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
testLenientAndStrict('try{}catch([eval]){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
testLenientAndStrict('try{}catch({x:eval}){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
testLenientAndStrict('try{}catch(arguments){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
testLenientAndStrict('try{}catch([arguments]){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
testLenientAndStrict('try{}catch({x:arguments}){}', parsesSuccessfully, parseRaisesException(SyntaxError));
true;
reportCompare(true, true);
