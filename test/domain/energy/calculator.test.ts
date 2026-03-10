import test from "node:test";
import assert from "node:assert/strict";

import { calculateEnergy } from "../../../src/energy/calculator";
import { defaultCoreConfig } from "../../../src/config/default-core-config";

const config = defaultCoreConfig.energy;

test("calculateEnergy computes HV, QH, end energy and primary energy", () => {
  const result = calculateEnergy(
    {
      degreeDaysKdPerA: 3000,
      heatedAirVolumeM3: 500,
      airChangeRate: 0.5,
      solarGainUtilizationFactor: 0.9,
      peopleCount: 4,
      solarGainEntries: [{ area: 10, irradiationKWhPerM2A: 100, energyTransmittance: 0.5 }],
    },
    {
      totalHt: 307.8,
      heating: {
        mode: "central",
        primaryCarrier: "gas",
        primaryType: "standard_boiler_gas",
        yearOfConstruction: 2012,
      },
    },
    config,
  );

  assert.equal(result.ventilationHeatTransferCoefficientWPerK, 85);
  assert.equal(result.usableAreaM2, 160);
  assert.equal(result.internalGainsKWhPerYear, 3552);
  assert.equal(result.solarGainsKWhPerYear, 500);
  assert.ok(Math.abs(result.heatingDemandKWhPerYear - 24634.8) < 1e-9);
  assert.equal(result.domesticHotWaterDemandKWhPerYear, 2000);
  assert.ok(Math.abs(result.finalEnergyFactor - 1.533) < 1e-12);
  assert.equal(result.primaryEnergyFactor, 1.1);
  assert.ok(Math.abs(result.finalEnergyDemandKWhPerYear - 40831.1484) < 1e-7);
  assert.ok(Math.abs(result.primaryEnergyDemandKWhPerYear - 44914.26324) < 1e-6);
  assert.ok(Math.abs(result.generatorEfficiency - 0.6523157208088716) < 1e-12);
  assert.ok(Math.abs(result.fuelConsumptionPerYear - 4083.11484) < 1e-7);
  assert.equal(result.fuelConsumptionUnit, "m3");
  assert.ok(Math.abs(result.specificFuelCostPerUnit - 1.2) < 1e-12);
  assert.ok(Math.abs(result.specificFuelCostPerKWh - 0.12) < 1e-12);
  assert.ok(Math.abs(result.fuelCostPerYear - 4899.737808) < 1e-7);
  assert.ok(Math.abs(result.co2EmissionsTonsPerYear - 8.2478919768) < 1e-9);
});

test("calculateEnergy uses explicit overrides for final and primary factors", () => {
  const result = calculateEnergy(
    {
      transmissionHeatLossWPerK: 100,
      ventilationHeatTransferCoefficientWPerK: 50,
      degreeDaysKdPerA: 2500,
      usableAreaM2: 120,
      internalGainsKWhPerYear: 1000,
      solarGainsKWhPerYear: 500,
      domesticHotWaterDemandKWhPerYear: 2500,
      finalEnergyFactor: 1.2,
      primaryEnergyFactor: 0.8,
      generatorEfficiency: 0.9,
      fuelConsumptionUnitsPerKWh: 0.5,
      fuelUnit: "test_unit",
      specificFuelCostPerUnit: 2,
      co2KgPerFuelUnit: 3,
      peopleCount: 3,
    },
    { totalHt: 0 },
    config,
  );

  assert.equal(result.degreeDayFactor, 60);
  assert.equal(result.heatingDemandKWhPerYear, 7500);
  assert.equal(result.thermalEnergyDemandKWhPerYear, 10000);
  assert.equal(result.finalEnergyDemandKWhPerYear, 12000);
  assert.equal(result.primaryEnergyDemandKWhPerYear, 9600);
  assert.equal(result.generatorEfficiency, 0.9);
  assert.equal(result.fuelConsumptionPerYear, 6000);
  assert.equal(result.fuelConsumptionUnit, "test_unit");
  assert.equal(result.specificFuelCostPerUnit, 2);
  assert.equal(result.specificFuelCostPerKWh, 1);
  assert.equal(result.fuelCostPerYear, 12000);
  assert.equal(result.co2EmissionsTonsPerYear, 18);
});
