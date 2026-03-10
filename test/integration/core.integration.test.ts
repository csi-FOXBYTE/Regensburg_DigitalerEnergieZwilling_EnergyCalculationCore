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
      topFloorCeiling: {
        catalog: "category1",
        construction: "topFloorCeiling_massive",
        year: 1990,
        area: 100,
        ageYears: 50,
      },
      lowestFloor: {
        catalog: "category1",
        construction: "lowestFloor_concrete",
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
      energy: {
        degreeDaysKdPerA: 3000,
        heatedAirVolumeM3: 500,
        airChangeRate: 0.5,
        solarGainUtilizationFactor: 0.9,
        peopleCount: 4,
        solarGainEntries: [{ area: 10, irradiationKWhPerM2A: 100, energyTransmittance: 0.5 }],
      },
    },
    defaultCoreConfig,
  );

  assert.ok(result.roofWindow);
  assert.ok(result.wallWindow);
  assert.ok(result.topFloorCeiling);
  assert.ok(result.lowestFloor);
  assert.ok(result.heating);
  assert.ok(result.energy);

  assert.equal(result.roofWindow.totalHt, 107.8);
  assert.equal(result.wallWindow.totalHt, 110);
  assert.equal(result.topFloorCeiling.totalHt, 30);
  assert.equal(result.lowestFloor.totalHt, 60);

  assert.equal(result.aggregate.totalHt, 307.8);
  assert.equal(result.aggregate.totalReferenceArea, 420);
  assert.ok(Math.abs(result.aggregate.htPrime - 307.8 / 420) < 1e-12);

  assert.deepEqual(
    result.roofWindow.recommendations.map((entry) => entry.action),
    ["insulate", "replace"],
  );
  assert.deepEqual(
    result.wallWindow.recommendations.map((entry) => entry.action),
    ["full_renovation", "none"],
  );
  assert.equal(result.topFloorCeiling.recommendations[0]?.action, "insulate");
  assert.equal(result.lowestFloor.recommendations[0]?.action, "none");
  assert.equal(result.heating.recommendation.action, "replace");
  assert.equal(result.energy.ventilationHeatTransferCoefficientWPerK, 85);
  assert.ok(Math.abs(result.energy.heatingDemandKWhPerYear - 24634.8) < 1e-9);
  assert.ok(Math.abs(result.energy.finalEnergyDemandKWhPerYear - 40831.1484) < 1e-7);
  assert.ok(Math.abs(result.energy.primaryEnergyDemandKWhPerYear - 44914.26324) < 1e-6);
  assert.ok(Math.abs(result.energy.fuelConsumptionPerYear - 4083.11484) < 1e-7);
  assert.ok(Math.abs(result.energy.fuelCostPerYear - 4899.737808) < 1e-7);
  assert.ok(Math.abs(result.energy.co2EmissionsTonsPerYear - 8.2478919768) < 1e-9);
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
  assert.ok(Math.abs(result.aggregate.totalHt - 123.6) < 1e-12);
  assert.ok(Math.abs(result.aggregate.htPrime - 123.6 / 500) < 1e-12);
});
