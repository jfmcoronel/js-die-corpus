var cases = ["{", "{ ;", "var", "var x,", "var x =", "let x,", "let x =", "const", "const x =", "const x = 1,", "if", "if (", "if (0) ; else", "do", "do ;", "do ; while", "do ; while (", "do ; while (1", "while", "while (", "while (1", "while (1)", "for", "for (", "for (;", "for (;;", "for (;;)", "for (var", "for (x", "for (x in", "for (x in y", "for (x in y)", "for (x of", "for (x of y", "for (x of y)", "switch", "switch (", "switch (x", "switch (x)", "with", "with (", "with (x", "with (x)", "a:", "throw", "try", "try {", "try {} catch", "try {} catch (", "try {} catch (exc", "try {} catch (exc if", "try {} catch (exc if 1", "try {} finally", "try {} finally {", "function", "function f", "function f(", "function f()", "function f() {", "(function", "(function f", "(function f(", "(function f()"];

for (var s of cases) {
  (() => Function(s))();

  SyntaxError;
}
