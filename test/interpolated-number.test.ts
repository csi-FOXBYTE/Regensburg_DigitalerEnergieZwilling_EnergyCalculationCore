import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  InterpolatedNumberSchema,
  resolveInterpolatedNumber,
  type InterpolatedNumber,
} from "../src/types/interpolated-number.js";

const definition: InterpolatedNumber = {
  points: [
    { at: 150, value: 1.47 },
    { at: 500, value: 1.36 },
    { at: 2500, value: 1.28 },
  ],
};

describe("resolveInterpolatedNumber", () => {
  test("returns constant definitions unchanged", () => {
    assert.equal(resolveInterpolatedNumber(1.02, 500), 1.02);
  });

  test("returns exact configured point values", () => {
    assert.equal(resolveInterpolatedNumber(definition, 150), 1.47);
    assert.equal(resolveInterpolatedNumber(definition, 500), 1.36);
    assert.equal(resolveInterpolatedNumber(definition, 2500), 1.28);
  });

  test("interpolates linearly between points", () => {
    assert.equal(resolveInterpolatedNumber(definition, 325), 1.415);
    assert.equal(resolveInterpolatedNumber(definition, 1500), 1.32);
  });

  test("clamps values outside the point range", () => {
    assert.equal(resolveInterpolatedNumber(definition, 0), 1.47);
    assert.equal(resolveInterpolatedNumber(definition, 3000), 1.28);
  });
});

describe("InterpolatedNumberSchema", () => {
  test("requires at least two points", () => {
    assert.equal(InterpolatedNumberSchema.safeParse({ points: [{ at: 150, value: 1.47 }] }).success, false);
  });

  test("requires points to be strictly ascending", () => {
    assert.equal(
      InterpolatedNumberSchema.safeParse({
        points: [
          { at: 500, value: 1.36 },
          { at: 150, value: 1.47 },
        ],
      }).success,
      false,
    );
  });
});
