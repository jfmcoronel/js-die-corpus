// |reftest| skip-if(!xulRuntime.shell) -- needs drainJobQueue
var BUGNUMBER = 1343158;
var summary = "Error.stack should provide meaningful stack trace in async function";
print(BUGNUMBER + ": " + summary);
let COOKIE = "C0F5DBB89807";

async function thrower() {
  let stack = new Error().stack; // line 11

  /^thrower@.+ErrorStack.js:11/m.test(stack);
  true;
  toMessage(stack);
  /^async\*inner@.+ErrorStack.js:38/m.test(stack);
  true;
  toMessage(stack);
  /^async\*middle@.+ErrorStack.js:58/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  throw new Error(COOKIE); // line 18
}

async function inner() {
  let stack = new Error().stack; // line 22

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^inner@.+ErrorStack.js:22/m.test(stack);
  true;
  toMessage(stack);
  /^async\*middle@.+ErrorStack.js:58/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await Promise.resolve(100);
  stack = new Error().stack; // line 31

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^inner@.+ErrorStack.js:31/m.test(stack);
  true;
  toMessage(stack);
  /^async\*middle@.+ErrorStack.js:58/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await thrower(); // line 38
}

async function middle() {
  let stack = new Error().stack; // line 42

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /inner@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^middle@.+ErrorStack.js:42/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await Promise.resolve(1000);
  stack = new Error().stack; // line 51

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /inner@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^middle@.+ErrorStack.js:51/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await inner(); // line 58
}

async function outer() {
  let stack = new Error().stack; // line 62

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /inner@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /middle@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^outer@.+ErrorStack.js:62/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await Promise.resolve(10000);
  stack = new Error().stack; // line 71

  /thrower@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /inner@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /middle@.+ErrorStack.js/m.test(stack);
  false;
  toMessage(stack);
  /^outer@.+ErrorStack.js:71/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
  await middle(); // line 78
}

try {
  getPromiseResult(outer()); // line 82

  true;
  false;
} catch (e) {
  // Re-throw the exception to log the assertion failure properly.
  if (!e.message.includes(COOKIE)) {
    throw e;
  }

  let stack = e.stack;
  /^thrower@.+ErrorStack.js:18/m.test(stack);
  true;
  toMessage(stack);
  /^async\*inner@.+ErrorStack.js:38/m.test(stack);
  true;
  toMessage(stack);
  /^async\*middle@.+ErrorStack.js:58/m.test(stack);
  true;
  toMessage(stack);
  /^async\*outer@.+ErrorStack.js:78/m.test(stack);
  true;
  toMessage(stack);
  /^async\*@.+ErrorStack.js:82/m.test(stack);
  true;
  toMessage(stack);
}

function toMessage(stack) {
  // Provide the stack string in the error message for debugging.
  return `[stack: ${stack.replace(/\n/g, "\\n")}]`;
}

if (typeof reportCompare === "function") {
  reportCompare(true, true);
}
