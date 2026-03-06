import test from "node:test";
import assert from "node:assert/strict";

import { defaultCoreConfig } from "../../../src/config/default-core-config";
import { calculateRoofWindow, calculateSingleSurface, calculateWallWindow } from "../../../src/envelope/calculators";

test("calculateRoofWindow computes HT with deltaUwb and recommendations", () => {
  const result = calculateRoofWindow(
    {
      roof: { uValue: 0.2, area: 10, ageYears: 45 },
      roofWindow: { uValue: 1.0, area: 2, factor: 0.9, ageYears: 10 },
    },
    defaultCoreConfig.envelope,
  );

  assert.equal(result.roof.ht, 2);
  assert.equal(result.roofWindow.ht, 1.8);
  assert.equal(result.sumHt, 3.8);
  assert.ok(Math.abs(result.bridgeHt - 1.2) < 1e-12);
  assert.equal(result.totalHt, 5);
  assert.equal(result.htPrime, 5 / 12);
  assert.equal(result.recommendations.length, 2);
  assert.equal(result.recommendations[0]?.action, "full_renovation");
  assert.equal(result.recommendations[1]?.action, "none");
});

test("calculateWallWindow computes HT and age-based recommendations", () => {
  const result = calculateWallWindow(
    {
      wall: {
        catalog: "category1",
        construction: "wall_over_20cm",
        year: 1970,
        area: 80,
        ageYears: 55,
      },
      window: {
        catalog: "category1",
        construction: "window_wood_double",
        year: 2005,
        area: 20,
        ageYears: 10,
      },
    },
    defaultCoreConfig.envelope,
  );

  assert.equal(result.wall.uValue, 1);
  assert.equal(result.window.uValue, 1.5);
  assert.equal(result.totalHt, 110);
  assert.equal(result.referenceArea, 100);
  assert.equal(result.htPrime, 1.1);
  assert.equal(result.recommendations[0]?.action, "full_renovation");
  assert.equal(result.recommendations[1]?.action, "none");
});

test("calculateWallWindow uses explicit envelopeArea when provided", () => {
  const result = calculateWallWindow(
    {
      wall: { uValue: 0.5, area: 80 },
      window: { uValue: 1.5, area: 20 },
      envelopeArea: 120,
    },
    defaultCoreConfig.envelope,
  );

  assert.equal(result.totalHt, 70);
  assert.equal(result.referenceArea, 120);
  assert.equal(result.htPrime, 70 / 120);
});

test("calculateSingleSurface handles zero area safely", () => {
  const result = calculateSingleSurface(
    { uValue: 0.5, area: 0, ageYears: 50 },
    defaultCoreConfig.envelope.recommendations.ogd,
    "ogd",
    defaultCoreConfig.envelope,
  );

  assert.equal(result.totalHt, 0);
  assert.equal(result.htPrime, 0);
  assert.equal(result.recommendations[0]?.action, "insulate");
});
