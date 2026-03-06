import test from "node:test";
import assert from "node:assert/strict";

import { calculateCore, defaultCoreConfig } from "../../src/index";

test("integration: calculateCore runs end-to-end with all domains", () => {
  const result = calculateCore(
    {
      roofWindow: {
        roof: {
          catalog: "category1",
          construction: "roof_massive",
          year: 1985,
          area: 100,
          ageYears: 35,
        },
        roofWindow: {
          catalog: "category1",
          construction: "window_pvc_iso",
          year: 1985,
          area: 20,
          ageYears: 31,
        },
      },
      wallWindow: {
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
      ogd: {
        catalog: "category1",
        construction: "ogd_massive",
        year: 1990,
        area: 100,
        ageYears: 50,
      },
      ugd: {
        catalog: "category1",
        construction: "ugd_concrete",
        year: 1990,
        area: 100,
        ageYears: 20,
      },
      heating: {
        mode: "central",
        primaryCarrier: "gas",
        primaryType: "standard_boiler_gas",
        yearOfConstruction: 2012,
      },
    },
    defaultCoreConfig,
  );

  assert.ok(result.roofWindow);
  assert.ok(result.wallWindow);
  assert.ok(result.ogd);
  assert.ok(result.ugd);
  assert.ok(result.heating);

  assert.equal(result.roofWindow.totalHt, 90);
  assert.equal(result.wallWindow.totalHt, 110);
  assert.equal(result.ogd.totalHt, 30);
  assert.equal(result.ugd.totalHt, 60);

  assert.equal(result.aggregate.totalHt, 290);
  assert.equal(result.aggregate.totalReferenceArea, 420);
  assert.ok(Math.abs(result.aggregate.htPrime - 290 / 420) < 1e-12);

  assert.deepEqual(
    result.roofWindow.recommendations.map((entry) => entry.action),
    ["insulate", "replace"],
  );
  assert.deepEqual(
    result.wallWindow.recommendations.map((entry) => entry.action),
    ["full_renovation", "none"],
  );
  assert.equal(result.ogd.recommendations[0]?.action, "insulate");
  assert.equal(result.ugd.recommendations[0]?.action, "none");
  assert.equal(result.heating.recommendation.action, "replace");
});

test("integration: explicit envelope areas and aggregate override are respected", () => {
  const result = calculateCore(
    {
      roofWindow: {
        roof: { uValue: 0.2, area: 100 },
        roofWindow: { uValue: 1.0, area: 20 },
        envelopeArea: 150,
      },
      wallWindow: {
        wall: { uValue: 0.5, area: 80 },
        window: { uValue: 1.5, area: 20 },
        envelopeArea: 120,
      },
      aggregateReferenceAreaOverride: 500,
    },
    defaultCoreConfig,
  );

  assert.ok(result.roofWindow);
  assert.ok(result.wallWindow);
  assert.equal(result.roofWindow.referenceArea, 150);
  assert.equal(result.wallWindow.referenceArea, 120);
  assert.equal(result.aggregate.totalReferenceArea, 500);
  assert.equal(result.aggregate.totalHt, 125);
  assert.equal(result.aggregate.htPrime, 125 / 500);
});
