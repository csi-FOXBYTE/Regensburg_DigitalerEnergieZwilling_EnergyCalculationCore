import test from "node:test";
import assert from "node:assert/strict";

import { resolveUValue, yearBandsFromLayout } from "../../../src/catalogs/u-value";

test("yearBandsFromLayout creates bands for arbitrary layout length", () => {
  const bands = yearBandsFromLayout(
    [1, 2, 3],
    [{ to: 1900 }, { from: 1901, to: 1950 }, { from: 1951 }],
  );

  assert.equal(bands.length, 3);
  assert.deepEqual(bands[0], { to: 1900, value: 1 });
  assert.deepEqual(bands[1], { from: 1901, to: 1950, value: 2 });
  assert.deepEqual(bands[2], { from: 1951, value: 3 });
});

test("yearBandsFromLayout throws for values/layout mismatch", () => {
  assert.throws(
    () => yearBandsFromLayout([1, 2], [{ to: 1900 }]),
    /Values\/layout length mismatch/,
  );
});

test("resolveUValue returns direct uValue when provided", () => {
  const value = resolveUValue({ uValue: 0.42 }, {});
  assert.equal(value, 0.42);
});

test("resolveUValue picks the matching year band from catalog", () => {
  const catalogs = {
    category1: {
      roof: yearBandsFromLayout(
        [10, 20, 90],
        [{ to: 1918 }, { from: 1919, to: 2001 }, { from: 2002 }],
      ),
    },
  };

  assert.equal(resolveUValue({ catalog: "category1", construction: "roof", year: 1918 }, catalogs), 10);
  assert.equal(resolveUValue({ catalog: "category1", construction: "roof", year: 1919 }, catalogs), 20);
  assert.equal(resolveUValue({ catalog: "category1", construction: "roof", year: 2008 }, catalogs), 90);
});

test("resolveUValue throws for missing catalog", () => {
  assert.throws(
    () => resolveUValue({ catalog: "missing", construction: "roof", year: 2000 }, {}),
    /Missing catalog 'missing'/,
  );
});

test("resolveUValue throws for missing construction", () => {
  const catalogs = { category1: {} };

  assert.throws(
    () => resolveUValue({ catalog: "category1", construction: "missing", year: 2000 }, catalogs),
    /Missing construction 'missing'/,
  );
});

test("resolveUValue throws when year does not match any band", () => {
  const catalogs = {
    category1: {
      custom: [{ from: 2000, to: 2005, value: 1.1 }],
    },
  };

  assert.throws(
    () => resolveUValue({ catalog: "category1", construction: "custom", year: 1990 }, catalogs),
    /No year band/,
  );
});
