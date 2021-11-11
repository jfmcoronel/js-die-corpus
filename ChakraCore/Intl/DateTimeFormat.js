//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
const nonAsciiRegex = /[^\x00-\x7F]/g;

function ascii(str) {
  return str.replace(nonAsciiRegex, "");
}

const isICU = true;
const isWinGlob = true;

function assertFormat(expected, fmt, date, msg = "assertFormat") {
  console.log(ascii(expected), ascii(fmt.format(date)), `${msg}: fmt.format(date) did not match expected value`);

  if (isICU) {
    const parts = fmt.formatToParts(date);
    console.log(expected, parts.map(part => part.value).join(""), `${msg}: fmt.formatToParts(date) did not match expected value`);
    const types = parts.filter(part => part.type != "literal").map(part => part.type);
    console.log(new Set(types).size, types.length, `Duplicate non-literal parts detected in ${JSON.stringify(parts)}`);
  }
}

function t1() {
  const date = new Date(2000, 1, 1, 1, 1, 1);

  function test(options, expected) {
    expected;
    new Intl.DateTimeFormat("en-US", options);
    date;
    console.log(expected, ascii(date.toLocaleString("en-US", options)), `date.toLocaleString("en-US", ${JSON.stringify(options)})`);
  }

  function testPlatformSpecific(options, expectedWinGlob, expectedICU) {
    if (isICU) {
      test(options, expectedICU);
    } else {
      console.log(isWinGlob);
      test(options, expectedWinGlob);
    }
  }

  test({
    year: "numeric"
  }, "2000");
  test({
    year: "2-digit"
  }, "00");
  test({
    month: "numeric"
  }, "2");
  test({
    month: "2-digit"
  }, "02");
  test({
    month: "long"
  }, "February");
  test({
    month: "short"
  }, "Feb"); // WinGlob narrow is Feb, ICU narrow is F

  testPlatformSpecific({
    month: "narrow"
  }, "Feb", "F");
  test({
    day: "2-digit"
  }, "01");
  test({
    day: "numeric"
  }, "1");
  test({
    hour: "2-digit"
  }, "01 AM");
  test({
    hour: "numeric"
  }, "1 AM");
  test({
    hour: "numeric",
    minute: "2-digit"
  }, "1:01 AM");
  test({
    hour: "numeric",
    minute: "numeric"
  }, "1:01 AM");
  test({
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  }, "1:01:01 AM"); // WinGlob doesn't have non-2-digit seconds

  testPlatformSpecific({
    hour: "numeric",
    minute: "2-digit",
    second: "numeric"
  }, "1:01:01 AM", "1:01:1 AM");
  test({
    hour: "numeric",
    hour12: true
  }, "1 AM");
  testPlatformSpecific({
    hour: "numeric",
    hour12: false
  }, "1:00", "01");
  const epochYear = parseInt(ascii(new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "UTC"
  }).format(0)), 10);
  console.log(epochYear === 1970); // By default, DateTimeFormat formats year, month, and day. Technically, Date.now() in the second call will be slightly after
  // the defaulted Date.now() in the first call, but this should only produce a different string if the first call runs before
  // midnight on day X and the second call runs after midnight on day X+1. That seems unlikely enough that it will only cause
  // flakiness in the rarest of circumstances

  console.log(new Intl.DateTimeFormat().format(), new Intl.DateTimeFormat().format(Date.now()));
}

t1();

function t2() {
  function test(locale, options, expected, message) {
    expected = Object.assign({}, {
      locale: /en/,
      numberingSystem: "latn",
      calendar: "gregory",
      timeZone: /.+/
    }, expected);
    const actual = new Intl.DateTimeFormat(locale, options).resolvedOptions();

    for (const key in expected) {
      if (expected[key] !== null) {
        expected[key] instanceof RegExp ? expected[key] === actual[key] : expected[key] === actual[key];
      } else {
        console.log(actual.hasOwnProperty(key), `${message} - ${key} should not be present in ${JSON.stringify(actual, null, 2)}`);
      }
    }
  }

  test("en-US", undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }, "Default options do not match");
  test("en-US", {
    year: "numeric"
  }, {
    year: "numeric",
    month: null,
    day: null
  }, "Requesting year should not fill in other date or time options");
  test("en-US", {
    hour: "numeric"
  }, {
    hour: "numeric",
    minute: null,
    month: null
  }, "Requesting hour should not fill in other date or time options");
  test("en-US", {
    hour12: false
  }, {
    hour12: null
  }, "Requesting hour12 without hour shouldn't do anything");
  test("en-US", {
    hour: "numeric",
    hour12: "non-falsy value"
  }, {
    hour: "numeric",
    hour12: true
  });
}

t2();

function t3() {
  function test(key, validOptions, kind = RangeError) {
    for (const option of validOptions) {
      try {
        new Intl.DateTimeFormat(undefined, {
          [key]: option
        }).format();
      } catch (e) {
        ;
      }
    }

    try {
      new Intl.DateTimeFormat(undefined, {
        [key]: "invalid"
      }).format();
    } catch (e) {
      ;
    }
  }

  const twoDigitNumeric = ["2-digit", "numeric"];
  const narrowShortLong = ["narrow", "short", "long"];
  const allOptionValues = twoDigitNumeric.concat(narrowShortLong);
  const options = {
    weekday: narrowShortLong,
    era: narrowShortLong,
    year: twoDigitNumeric,
    month: allOptionValues,
    day: twoDigitNumeric,
    hour: twoDigitNumeric,
    minute: twoDigitNumeric,
    second: twoDigitNumeric,
    localeMatcher: ["lookup", "best fit"],
    formatMatcher: ["basic", "best fit"]
  }; // see https://github.com/Microsoft/ChakraCore/issues/3096

  if (isICU) {
    options.timeZoneName = narrowShortLong.slice(1);
  }

  for (const option of Object.keys(options)) {
    test(option, options[option]);
  }
}

t3();

function t4() {
  // WinGlob does not implement formatToParts
  if (isWinGlob) {
    return;
  }

  console.log(isICU);
  const date = new Date(2000, 0, 1, 0, 0, 0);

  function test(options, key, value, message = "Error") {
    const fmt = new Intl.DateTimeFormat("en-US", options);
    const toString = fmt.format(date);
    const toParts = fmt.formatToParts(date);
    toString;
    fmt;
    date;

    if (typeof key === "string") {
      const part = toParts.find(p => p.type === key);
      console.log(part && typeof part.value === "string", `${message} - ${JSON.stringify(toParts)} expected to have part with type "${key}"`);
      console.log(value, part.value, `${message} - expected ${key} to be ${value}, but was actually ${part.value}`);
    } else {
      console.log(key.length, value.length);
      key.forEach(function (k, i) {
        const v = value[i];
        const part = toParts.find(p => p.type === k);
        console.log(part && typeof part.value === "string", `${message} - ${JSON.stringify(toParts)} expected to have part with type "${k}"`);
        console.log(v, part.value, `${message} - expected ${k} to be ${v}, but was actually ${part.value}`);
      });
    }
  }

  test(undefined, ["year", "month", "day"], ["2000", "1", "1"]);
  test({
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  }, ["year", "month", "day"], ["00", "01", "01"]);
  test({
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }, ["hour", "minute", "second"], ["12", "00", "00"]);
  test({
    month: "long"
  }, "month", "January"); // the "literal" tested here is the first of two literals, the second of which is a space between "12" and "AM"

  test({
    hour: "numeric",
    weekday: "long"
  }, ["weekday", "literal", "hour", "dayPeriod"], ["Saturday", ", ", "12", "AM"]);
}

t4();

function t5() {
  // WinGlob does not implement hourCycle
  if (isWinGlob) {
    return;
  }

  console.log(isICU);
  const midnight = new Date(2000, 0, 1, 0, 0, 0);
  const noon = new Date(2000, 0, 1, 12, 0, 0);

  function test(locale, useHourField, options, expectedHC, expectedHour12) {
    options = useHourField === false ? options : Object.assign({}, {
      hour: "2-digit"
    }, options);
    const fmt = new Intl.DateTimeFormat(locale, options);
    const message = `locale: "${locale}", options: ${JSON.stringify(options)}`;
    console.log(expectedHC, fmt.resolvedOptions().hourCycle, `${message} - hourCycle is not correct`);
    console.log(expectedHour12, fmt.resolvedOptions().hour12, `${message} - hour12 is not correct`);

    if (useHourField === true) {
      const expectedNoon = {
        h11: "00",
        h12: "12",
        h23: "12",
        h24: "12"
      }[expectedHC];
      const expectedMidnight = {
        h11: "00",
        h12: "12",
        h23: "00",
        h24: "24"
      }[expectedHC];
      console.log(expectedMidnight, fmt.formatToParts(midnight).find(p => p.type === "hour").value, `${message} - midnight value was incorrect`);
      console.log(expectedNoon, fmt.formatToParts(noon).find(p => p.type === "hour").value, `${message} - noon value was incorrect`);
    } else {
      assert.isUndefined(fmt.formatToParts(midnight).find(p => p.type === "hour"), `${message} - unexpected hour field`);
    }
  }

  function withoutHour(locale, options) {
    test(locale, false, options, undefined, undefined);
  }

  function withHour(locale, options, expectedHC, expectedHour12) {
    test(locale, true, options, expectedHC, expectedHour12);
  } // ensure hourCycle and hour properties are not there when we don't ask for them


  withoutHour("en-US", undefined);
  withoutHour("en-US", {
    hourCycle: "h11"
  });
  withoutHour("en-US", {
    hour12: true
  });
  withoutHour("en-US", {
    hourCycle: "h11",
    hour12: false
  });
  withoutHour("en-US-u-hc-h24", undefined);
  withoutHour("en-US-u-hc-h24", {
    hourCycle: "h11"
  });
  withoutHour("en-US-u-hc-h24", {
    hour12: true
  });
  withoutHour("en-US-u-hc-h24", {
    hourCycle: "h11",
    hour12: false
  }); // ensure hourCycle and hour12 properties along with hour values are correct when we do ask for hour

  withHour("en-US", undefined, "h12", true);
  withHour("en-US", {
    hour12: false
  }, "h23", false);
  withHour("en-US", {
    hourCycle: "h24"
  }, "h24", false);
  withHour("en-US", {
    hourCycle: "h24",
    hour12: true
  }, "h12", true);
  withHour("en-US", {
    hourCycle: "h11",
    hour12: false
  }, "h23", false);
  withHour("en-US-u-hc-h24", undefined, "h24", false);
  withHour("en-US-u-hc-h24", {
    hourCycle: "h23"
  }, "h23", false);
  withHour("en-US-u-hc-h24", {
    hourCycle: "h11"
  }, "h11", true);
  withHour("en-US-u-hc-h24", {
    hour12: false
  }, "h23", false);
  withHour("en-US-u-hc-h24", {
    hour12: true
  }, "h12", true);

  if (new Intl.DateTimeFormat("en-GB").resolvedOptions().locale === "en-GB") {
    withoutHour("en-GB", undefined);
    withHour("en-GB", undefined, "h23", false);
    withHour("en-GB", {
      hour12: true
    }, "h12", true);
    withHour("en-GB-u-hc-h24", undefined, "h24", false);
  }

  if (new Intl.DateTimeFormat("ja-JP").resolvedOptions().locale === "ja-JP") {
    withoutHour("ja-JP", undefined);
    withHour("ja-JP", undefined, "h23", false);
    withHour("ja-JP", {
      hour12: true
    }, "h11", true);
    withHour("ja-JP-u-hc-h12", undefined, "h12", true);
  }
}

t5();

function t6() {
  // WinGlob does not implement formatToParts, which is used for more easily testing
  // Also, bizarrely, WinGlob code throws an exception *only in ch* when using timeZoneName
  // Bug: https://github.com/Microsoft/ChakraCore/issues/3096
  if (isWinGlob) {
    return;
  }

  console.log(isICU);

  function innerTest(date, timeZone, timeZoneName, expectedPart, expectedTimeZone) {
    const options = {
      hour: "numeric",
      timeZone,
      timeZoneName
    };
    const fmt = new Intl.DateTimeFormat("en-US", options);
    const actualTimeZone = fmt.resolvedOptions().timeZone;
    console.log(expectedTimeZone, actualTimeZone, `resolvedOptions().timeZone was incorrect`);
    const parts = fmt.formatToParts(date);
    console.log(parts.length > 2, `There must at least be a time and timeZone part of ${JSON.stringify(parts)}`);
    const actualPart = parts.filter(part => part.type === "timeZoneName")[0];
    assert.isNotUndefined(actualPart, `No timeZone part in ${JSON.stringify(parts)}`);
    console.log(expectedPart, actualPart.value, `Incorrect timeZoneName for ${date.toString()} with options ${JSON.stringify(options)}`);
  }

  function test(date, timeZone, expectedShortPart, expectedLongPart, expectedTimeZone) {
    innerTest(date, timeZone, "short", expectedShortPart, expectedTimeZone);
    innerTest(date, timeZone, "long", expectedLongPart, expectedTimeZone);
  }

  const newYears = new Date(Date.parse("2018-01-01T00:00:00.000Z"));
  const juneFirst = new Date(Date.parse("2018-06-01T00:00:00.000Z")); // see https://github.com/tc39/ecma402/issues/121 for edge cases here
  // ICU ~55 formats GMT-like time zones as GMT, but ICU ~60 formats them as UTC

  const UTCshort = WScript.Platform.ICU_VERSION >= 59 ? "UTC" : "GMT";
  const UTClong = WScript.Platform.ICU_VERSION >= 59 ? "Coordinated Universal Time" : "GMT";
  test(newYears, "GMT", UTCshort, UTClong, "UTC");
  test(newYears, "Etc/GMT", UTCshort, UTClong, "UTC");
  test(newYears, "Etc/UTC", UTCshort, UTClong, "UTC");
  test(newYears, "Etc/UCT", UTCshort, UTClong, "UTC");
  test(newYears, "US/Pacific", "PST", "Pacific Standard Time", "America/Los_Angeles");
  test(newYears, "Etc/GMT-2", "GMT+2", "GMT+02:00", "Etc/GMT-2");
  test(newYears, "America/New_York", "EST", "Eastern Standard Time", "America/New_York");
  test(newYears, "America/Los_Angeles", "PST", "Pacific Standard Time", "America/Los_Angeles");
  test(juneFirst, "America/New_York", "EDT", "Eastern Daylight Time", "America/New_York");
  test(juneFirst, "America/Los_Angeles", "PDT", "Pacific Daylight Time", "America/Los_Angeles");
}

t6();

function t7() {
  if (isWinGlob) {
    return;
  } // This test raised Microsoft/ChakraCore#4885 and tc39/ecma402#225 - In the original ICU implementation
  // of Intl.DateTimeFormat, we would generate the date pattern using the fully resolved locale, including
  // any unicode extension keys to specify the calendar and numbering system.
  // This caused ICU to generate more accurate patterns in the given calendar system, but is not spec
  // compliant by #sec-initializedatetimeformat as of Intl 2018.
  // Revisit the values for chinese and dangi calendars in particular in the future if pattern generation
  // switches to using the full locale instead of just the basename, as those calendar systems prefer to
  // to be represented in ICU by a year name and a related gregorian year.


  const d = new Date(Date.UTC(2018, 2, 27, 12, 0, 0)); // lists of calendars and aliases taken from https://unicode.org/repos/cldr/trunk/common/bcp47/calendar.xml
  // as of March 27th, 2018

  const yearForCalendar = {
    buddhist: {
      latn: "2561",
      thai: "๒๕๖๑"
    },
    // TODO(jahorto): investigate chinese and dangi calendars - Microsoft/ChakraCore#4885
    chinese: {
      latn: "35",
      thai: "๓๕"
    },
    coptic: {
      latn: "1734",
      thai: "๑๗๓๔"
    },
    dangi: {
      latn: "35",
      thai: "๓๕"
    },
    ethioaa: {
      latn: "7510",
      thai: "๗๕๑๐"
    },
    ethiopic: {
      latn: "2010",
      thai: "๒๐๑๐"
    },
    gregory: {
      latn: "2018",
      thai: "๒๐๑๘"
    },
    hebrew: {
      latn: "5778",
      thai: "๕๗๗๘"
    },
    indian: {
      latn: "1940",
      thai: "๑๙๔๐"
    },
    islamic: {
      latn: "1439",
      thai: "๑๔๓๙"
    },
    "islamic-umalqura": {
      latn: "1439",
      thai: "๑๔๓๙"
    },
    "islamic-tbla": {
      latn: "1439",
      thai: "๑๔๓๙"
    },
    "islamic-civil": {
      latn: "1439",
      thai: "๑๔๓๙"
    },
    "islamic-rgsa": {
      latn: "1439",
      thai: "๑๔๓๙"
    },
    iso8601: {
      latn: "2018",
      thai: "๒๐๑๘"
    },
    japanese: {
      latn: "30",
      thai: "๓๐"
    },
    persian: {
      latn: "1397",
      thai: "๑๓๙๗"
    },
    roc: {
      latn: "107",
      thai: "๑๐๗"
    }
  };
  const calendarAliases = {
    ethioaa: ["ethiopic-amete-alem"],
    // ICU does not recognize "gregorian" as a valid alias
    // gregory: ["gregorian"],
    "islamic-civil": ["islamicc"]
  };

  function test(expected, base, calendar, numberingSystem) {
    let langtag = `${base}-u-ca-${calendar}`;

    if (numberingSystem) {
      langtag += `-nu-${numberingSystem}`;
    } // Extract just the year out of the string to ensure we don't get confused by added information, like eras.


    const fmt = new Intl.DateTimeFormat(langtag, {
      year: "numeric"
    });
    fmt.format(d);
    fmt;
    d;
    console.log(expected, fmt.formatToParts(d).filter(part => part.type === "year")[0].value, `${langtag} did not produce the correct year`);
  }

  function testEachCalendar(numberingSystem) {
    for (const calendar of Object.getOwnPropertyNames(yearForCalendar)) {
      test(yearForCalendar[calendar][numberingSystem || "latn"], "en", calendar, numberingSystem);

      if (calendar in calendarAliases) {
        const aliases = calendarAliases[calendar];

        for (const alias of aliases) {
          test(yearForCalendar[calendar][numberingSystem || "latn"], "en", alias, numberingSystem);
        }
      }
    }
  }

  for (const numberingSystem of [undefined, "latn", "thai"]) {
    testEachCalendar(numberingSystem);
  }
}

t7();

function t8() {
  if (isWinGlob) {
    return;
  }

  const dtf = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  for (const nearZero of [-0.9, -0.1, -Number.MIN_VALUE, -0, +0, Number.MIN_VALUE, 0.1, 0.9]) {
    console.log(dtf.format(0), dtf.format(nearZero), `Formatting 0 and ${nearZero} should produce the same result`);
  }

  try {
    dtf.format(-8.64e15 - 1);
  } catch (e) {
    ;
  }

  assert.doesNotThrow(() => dtf.format(-8.64e15), "Formatting the beginning of ES time");
  assert.doesNotThrow(() => dtf.format(8.64e15), "Formatting the end of ES time");

  try {
    dtf.format(8.64e15 + 1);
  } catch (e) {
    ;
  }
}

t8();
