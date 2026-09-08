import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { calculate } from "../../src/calculate.js";
import { DETEnergyCaluclator } from "../../src/calculators/energy/index.js";
import { BuildingType } from "../../src/types/building-type.js";
import { DEFAULT_CONFIG } from "../../src/types/config/default-config.js";
import type { DETInput } from "../../src/types/input/index.js";
import { validateInput } from "../../src/validators/index.js";

const clone = <T>(value: T): T => structuredClone(value);

function assertClose(actual: number, expected: number, tolerance = 1e-6): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function baseInput(): DETInput {
  return {
    general: {
      buildingYear: 1968,
      numberOfStories: 2,
      buildingHeight: 5.9,
      lowestEaveHeight: 5.9,
      buildingBaseArea: 77,
      type: BuildingType.SINGLE_FAMILY,
    },
    heat: {
      primaryEnergyCarrier: "natural_gas",
      heatingSystemType: "condensing_boiler_70_55",
      heatingSystemConstructionYear: 1998,
      heatingSurfaceType: "free_heat_emitter",
      hasGasSupply: true,
      hasStorage: false,
      hasGeothermalAvailability: false,
    },
    electricity: {},
    roof: {
      area: 77,
      isFlatRoof: false,
      year: 1968,
      hasInsulation: false,
      uValue: 0.8,
    },
    roofWindows: { area: 0, year: 1968, uValue: 2 },
    exteriorWallWindows: { area: 42.4, year: 1990, uValue: 2.7 },
    topFloor: {
      area: 77,
      year: 1968,
      hasAttic: true,
      isAtticHeated: false,
      hasInsulation: false,
      uValue: 0.7,
    },
    outerWall: {
      area: 212,
      areaWithoutAttic: 180,
      atticArea: 32,
      adjacentWallArea: 0,
      year: 1968,
      hasInsulation: false,
      uValue: 1.4,
    },
    bottomFloor: {
      area: 77,
      year: 1968,
      hasBasement: false,
      isBasementHeated: false,
      isHeated: false,
      hasInsulation: false,
      uValue: 1,
    },
    preRenovationValues: null,
  };
}

function evaluate(input: DETInput) {
  const validation = validateInput(input, DEFAULT_CONFIG);
  assert.equal(
    validation.success,
    true,
    validation.success ? undefined : JSON.stringify(validation.issues),
  );
  return {
    ctx: DETEnergyCaluclator({ config: DEFAULT_CONFIG, input }),
    result: calculate(DEFAULT_CONFIG, input),
  };
}

describe("absolute calculation paths with DEFAULT_CONFIG", () => {
  test("selects roof or top-floor path from attic state and preserves absolute demand", () => {
    const flatInput = baseInput();
    flatInput.roof.isFlatRoof = true;
    delete flatInput.topFloor.hasAttic;
    delete flatInput.topFloor.isAtticHeated;
    const flat = evaluate(flatInput);

    assert.equal(flat.ctx.get("hasAttic"), false);
    assert.equal(flat.ctx.get("isSpaceBelowRoofHeated"), true);
    assertClose(flat.ctx.get("roofHeatLoss"), 61.6);
    assertClose(flat.ctx.get("topFloorHeatLoss"), 0);
    assertClose(flat.ctx.get("grossHeatedVolume"), 438.9);
    assertClose(flat.result.annualHeatingEnergyDemand, 57808.31885923705);

    const unheatedInput = baseInput();
    unheatedInput.topFloor.hasAttic = true;
    unheatedInput.topFloor.isAtticHeated = false;
    const unheated = evaluate(unheatedInput);

    assert.equal(unheated.ctx.get("isSpaceBelowRoofHeated"), false);
    assertClose(unheated.ctx.get("roofHeatLoss"), 0);
    assertClose(unheated.ctx.get("topFloorHeatLoss"), 53.9);
    assertClose(unheated.ctx.get("grossHeatedVolume"), 438.9);
    assertClose(unheated.result.annualHeatingEnergyDemand, 57059.82027578904);

    const heatedInput = baseInput();
    heatedInput.topFloor.hasAttic = true;
    heatedInput.topFloor.isAtticHeated = true;
    const heated = evaluate(heatedInput);

    assert.equal(heated.ctx.get("isSpaceBelowRoofHeated"), true);
    assertClose(heated.ctx.get("roofHeatLoss"), 61.6);
    assertClose(heated.ctx.get("topFloorHeatLoss"), 0);
    assertClose(heated.ctx.get("grossHeatedVolume"), 666.05);
    assertClose(heated.result.annualHeatingEnergyDemand, 62843.65373000336);

    assertClose(
      flat.result.annualHeatingEnergyDemand - unheated.result.annualHeatingEnergyDemand,
      748.4985834480103,
    );
    assertClose(
      heated.result.annualHeatingEnergyDemand - unheated.result.annualHeatingEnergyDemand,
      5783.83345421432,
    );
  });

  test("selects slab or cellar-ceiling path and adds heated basement volume", () => {
    const makeBasementInput = (hasBasement: boolean, isBasementHeated: boolean) => {
      const input = baseInput();
      delete input.bottomFloor.uValue;
      input.bottomFloor.hasBasement = hasBasement;
      input.bottomFloor.isBasementHeated = isBasementHeated;
      return input;
    };

    const absent = evaluate(makeBasementInput(false, true));
    assert.equal(absent.ctx.get("isBasementHeated"), false);
    assert.equal(absent.ctx.get("isSpaceAboveBaseSlabHeated"), true);
    assert.equal(absent.ctx.get("bottomFloorConstructionType"), "reinforced_concrete_on_ground");
    assertClose(absent.ctx.get("bottomFloorUValue"), 1.2);
    assertClose(absent.ctx.get("bottomFloorHeatLoss"), 92.4);
    assertClose(absent.ctx.get("grossHeatedVolume"), 438.9);
    assertClose(absent.result.annualHeatingEnergyDemand, 58556.81744268503);

    const unheated = evaluate(makeBasementInput(true, false));
    assert.equal(unheated.ctx.get("isSpaceAboveBaseSlabHeated"), false);
    assert.equal(unheated.ctx.get("bottomFloorConstructionType"), "timber_joist_ceiling");
    assertClose(unheated.ctx.get("bottomFloorUValue"), 0.8);
    assertClose(unheated.ctx.get("bottomFloorHeatLoss"), 61.6);
    assertClose(unheated.ctx.get("grossHeatedVolume"), 438.9);
    assertClose(unheated.result.annualHeatingEnergyDemand, 55562.82310889304);

    const heated = evaluate(makeBasementInput(true, true));
    assert.equal(heated.ctx.get("isSpaceAboveBaseSlabHeated"), true);
    assert.equal(heated.ctx.get("bottomFloorConstructionType"), "reinforced_concrete_on_ground");
    assertClose(heated.ctx.get("bottomFloorUValue"), 1.2);
    assertClose(heated.ctx.get("bottomFloorHeatLoss"), 92.4);
    assertClose(heated.ctx.get("grossHeatedVolume"), 666.05);
    assertClose(heated.result.annualHeatingEnergyDemand, 63350.48997210213);

    assertClose(
      absent.result.annualHeatingEnergyDemand - unheated.result.annualHeatingEnergyDemand,
      2993.9943337919904,
    );
    assertClose(
      heated.result.annualHeatingEnergyDemand - unheated.result.annualHeatingEnergyDemand,
      7787.666863209088,
    );
  });

  test("resolves unsanitized, partially sanitized, and explicit component U-values", () => {
    const oldInput = baseInput();
    delete oldInput.roof.uValue;
    delete oldInput.topFloor.uValue;
    delete oldInput.outerWall.uValue;
    delete oldInput.exteriorWallWindows.uValue;
    delete oldInput.bottomFloor.uValue;
    oldInput.exteriorWallWindows.year = 1968;
    const old = evaluate(oldInput);

    assertClose(old.ctx.get("roofUValue"), 1.4);
    assertClose(old.ctx.get("topFloorUValue"), 0.7);
    assertClose(old.ctx.get("outerWallUValue"), 1.4);
    assertClose(old.ctx.get("exteriorWallWindowsUValue"), 2.7);
    assertClose(old.ctx.get("bottomFloorUValue"), 1.2);
    assertClose(old.result.annualHeatingEnergyDemand, 58556.81744268503);

    const zeroThicknessInput = clone(oldInput);
    zeroThicknessInput.roof.hasInsulation = true;
    zeroThicknessInput.roof.insulationThickness = 0;
    zeroThicknessInput.topFloor.hasInsulation = true;
    zeroThicknessInput.topFloor.insulationThickness = 0;
    zeroThicknessInput.outerWall.hasInsulation = true;
    zeroThicknessInput.outerWall.insulationThickness = 0;
    zeroThicknessInput.bottomFloor.hasInsulation = true;
    zeroThicknessInput.bottomFloor.insulationThickness = 0;
    const zeroThickness = evaluate(zeroThicknessInput);

    assertClose(zeroThickness.ctx.get("roofUValue"), old.ctx.get("roofUValue"));
    assertClose(zeroThickness.ctx.get("topFloorUValue"), old.ctx.get("topFloorUValue"));
    assertClose(zeroThickness.ctx.get("outerWallUValue"), old.ctx.get("outerWallUValue"));
    assertClose(zeroThickness.ctx.get("bottomFloorUValue"), old.ctx.get("bottomFloorUValue"));
    assertClose(
      zeroThickness.result.annualHeatingEnergyDemand,
      old.result.annualHeatingEnergyDemand,
    );

    const partialInput = clone(oldInput);
    partialInput.roof.hasInsulation = true;
    partialInput.roof.insulationThickness = 0.16;
    partialInput.topFloor.hasInsulation = true;
    partialInput.topFloor.insulationThickness = 0.16;
    partialInput.outerWall.hasInsulation = true;
    partialInput.outerWall.insulationThickness = 0.12;
    partialInput.exteriorWallWindows.year = 2010;
    partialInput.bottomFloor.hasInsulation = true;
    partialInput.bottomFloor.insulationThickness = 0.1;
    const partial = evaluate(partialInput);

    assertClose(partial.ctx.get("roofUValue"), 0.21212121212121213);
    assertClose(partial.ctx.get("topFloorUValue"), 0.15555555555555556);
    assertClose(partial.ctx.get("outerWallUValue"), 0.2413793103448276);
    assertClose(partial.ctx.get("exteriorWallWindowsUValue"), 1.5);
    assertClose(partial.ctx.get("bottomFloorUValue"), 0.24);
    assertClose(partial.result.annualHeatingEnergyDemand, 23248.652841655574);
    assertClose(
      old.result.annualHeatingEnergyDemand - partial.result.annualHeatingEnergyDemand,
      35308.16460102946,
    );

    const explicitInput = baseInput();
    explicitInput.roof.uValue = 0.21;
    explicitInput.topFloor.uValue = 0.22;
    explicitInput.outerWall.uValue = 0.23;
    explicitInput.exteriorWallWindows.uValue = 1.24;
    explicitInput.bottomFloor.uValue = 0.25;
    const explicit = evaluate(explicitInput);

    assertClose(explicit.ctx.get("roofUValue"), 0.21);
    assertClose(explicit.ctx.get("topFloorUValue"), 0.22);
    assertClose(explicit.ctx.get("outerWallUValue"), 0.23);
    assertClose(explicit.ctx.get("exteriorWallWindowsUValue"), 1.24);
    assertClose(explicit.ctx.get("bottomFloorUValue"), 0.25);
    assertClose(explicit.result.annualHeatingEnergyDemand, 22546.647800609997);

    const heatedOldInput = clone(oldInput);
    heatedOldInput.topFloor.isAtticHeated = true;
    const heatedOld = evaluate(heatedOldInput);
    assertClose(heatedOld.ctx.get("roofUValue"), 1.4);
    assertClose(heatedOld.result.annualHeatingEnergyDemand, 68811.45240279344);

    const heatedInsulatedInput = clone(heatedOldInput);
    heatedInsulatedInput.roof.hasInsulation = true;
    heatedInsulatedInput.roof.insulationThickness = 0.16;
    const heatedInsulated = evaluate(heatedInsulatedInput);
    assertClose(heatedInsulated.ctx.get("roofUValue"), 0.21212121212121213);
    assertClose(heatedInsulated.result.annualHeatingEnergyDemand, 59950.175585620294);

    const heatedExplicitInput = clone(explicitInput);
    heatedExplicitInput.topFloor.isAtticHeated = true;
    const heatedExplicit = evaluate(heatedExplicitInput);
    assertClose(heatedExplicit.ctx.get("roofUValue"), 0.21);
    assertClose(heatedExplicit.result.annualHeatingEnergyDemand, 27626.278692049626);
  });

  test("routes carrier systems into thermal or electrical demand with absolute factors", () => {
    const cases = [
      {
        name: "gas",
        carrier: "natural_gas",
        system: "condensing_boiler_70_55",
        surface: "free_heat_emitter",
        year: 1998,
        hasGasSupply: true,
        hasStorage: false,
        electricalRatio: 0,
        combinedFactor: 1.13741,
        endEnergy: 57059.82027578904,
        heatingPrimaryEnergy: 62765.80230336795,
      },
      {
        name: "oil",
        carrier: "heating_oil",
        system: "standard_boiler_70_55",
        surface: "free_heat_emitter",
        year: 1998,
        hasGasSupply: false,
        hasStorage: true,
        electricalRatio: 0,
        combinedFactor: 1.41379,
        endEnergy: 70580.57872246674,
        heatingPrimaryEnergy: 77638.63659471342,
      },
      {
        name: "district heating",
        carrier: "district_heating",
        system: "district_heating_all_temperatures",
        surface: "free_heat_emitter",
        year: 1998,
        hasGasSupply: false,
        hasStorage: false,
        electricalRatio: 0,
        combinedFactor: 1.08426,
        endEnergy: 54459.67442065871,
        heatingPrimaryEnergy: 54459.67442065871,
      },
      {
        name: "pellets",
        carrier: "wood_pellets",
        system: "standard_boiler_70_55",
        surface: "free_heat_emitter",
        year: 1998,
        hasGasSupply: false,
        hasStorage: true,
        electricalRatio: 0,
        combinedFactor: 1.41379,
        endEnergy: 70580.57872246674,
        heatingPrimaryEnergy: 14116.115744493349,
      },
      {
        name: "air-source heat pump",
        carrier: "none",
        system: "air_source_heat_pump_lt_40",
        surface: "radiant_surface_heating",
        year: 2010,
        hasGasSupply: false,
        hasStorage: false,
        electricalRatio: 1,
        combinedFactor: 0.39938,
        endEnergy: 13620.573310021222,
        heatingPrimaryEnergy: 24517.0319580382,
      },
    ] as const;

    for (const expected of cases) {
      const input = baseInput();
      input.heat.primaryEnergyCarrier = expected.carrier;
      input.heat.heatingSystemType = expected.system;
      input.heat.heatingSurfaceType = expected.surface;
      input.heat.heatingSystemConstructionYear = expected.year;
      input.heat.hasGasSupply = expected.hasGasSupply;
      input.heat.hasStorage = expected.hasStorage;
      input.heat.hasGeothermalAvailability = false;
      const { ctx, result } = evaluate(input);

      assert.equal(ctx.get("heatingSystemType"), expected.system, expected.name);
      assertClose(ctx.get("electricalRatio"), expected.electricalRatio);
      assertClose(ctx.get("combinedHeatingPerformanceFactor"), expected.combinedFactor);
      assertClose(result.annualHeatingEnergyDemand, expected.endEnergy);

      const heatingPrimaryEnergy =
        result.annualEnergyCarrierPrimaryDemand + result.annualElectricalHeatingEnergyDemand * 1.8;
      assertClose(heatingPrimaryEnergy, expected.heatingPrimaryEnergy);

      if (expected.electricalRatio === 0) {
        assertClose(result.annualCarrierHeatingEnergyDemand, expected.endEnergy);
        assertClose(result.annualElectricalHeatingEnergyDemand, 0);
      } else {
        assertClose(result.annualCarrierHeatingEnergyDemand, 0);
        assertClose(result.annualElectricalHeatingEnergyDemand, expected.endEnergy);
      }
    }
  });

  test("resolves inferred or explicit stories and building-type internal gains", () => {
    const inferredInput = baseInput();
    delete inferredInput.general.numberOfStories;
    const inferred = evaluate(inferredInput);
    assert.equal(inferred.ctx.get("numberOfStories"), 2);
    assertClose(inferred.ctx.get("grossHeatedVolume"), 438.9);
    assertClose(inferred.result.annualHeatingEnergyDemand, 57059.82027578904);

    const explicitInput = clone(inferredInput);
    explicitInput.general.numberOfStories = 3;
    const explicit = evaluate(explicitInput);
    assert.equal(explicit.ctx.get("numberOfStories"), 3);
    assertClose(explicit.ctx.get("grossHeatedVolume"), 666.05);
    assertClose(explicit.result.annualHeatingEnergyDemand, 62790.9550838233);

    const efhInput = baseInput();
    efhInput.heat.primaryEnergyCarrier = "none";
    efhInput.heat.heatingSystemType = "air_source_heat_pump_lt_40";
    efhInput.heat.heatingSystemConstructionYear = 2010;
    efhInput.heat.heatingSurfaceType = "radiant_surface_heating";
    const efh = evaluate(efhInput);
    assertClose(efh.ctx.get("internalGainsFactor"), 0.65);
    assertClose(efh.result.annualHeatingEnergyDemand, 13620.573310021222);

    const mfhInput = clone(efhInput);
    mfhInput.general.type = BuildingType.MULTI_FAMILY;
    const mfh = evaluate(mfhInput);
    assertClose(mfh.ctx.get("internalGainsFactor"), 0.5);
    assertClose(mfh.result.annualHeatingEnergyDemand, 10734.945716631708);
  });
});
