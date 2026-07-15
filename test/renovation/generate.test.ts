import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  generateHeatingRenovations,
  generateInsulationRenovations,
} from "../../src/types/renovation/generate.js";
import type { InsulationRenovationKeys } from "../../src/types/renovation/renovation.js";
import { DEFAULT_CONFIG } from "../../src/types/config/default-config.js";
import { baseConfig, baseInput } from "../validators/fixtures.js";

function generate(input = baseInput()) {
  return generateInsulationRenovations(
    baseConfig(),
    input,
    (key: InsulationRenovationKeys) => key,
  );
}

function renovationIds(input = baseInput()): string[] {
  return generate(input).map((renovation) => renovation.id);
}

describe("generateInsulationRenovations — roof boundary", () => {
  test("shows roof but not top-floor renovation when there is no attic", () => {
    const input = baseInput();
    input.topFloor.hasAttic = false;
    input.topFloor.isAtticHeated = true;

    const ids = renovationIds(input);

    assert.ok(ids.includes("envelope_roof"));
    assert.ok(!ids.includes("envelope_topFloor"));
  });

  test("shows roof but not top-floor renovation when the attic is heated", () => {
    const input = baseInput();
    input.topFloor.hasAttic = true;
    input.topFloor.isAtticHeated = true;

    const ids = renovationIds(input);

    assert.ok(ids.includes("envelope_roof"));
    assert.ok(!ids.includes("envelope_topFloor"));
  });

  test("shows top-floor but not roof renovation when the attic is unheated", () => {
    const input = baseInput();
    input.topFloor.hasAttic = true;
    input.topFloor.isAtticHeated = false;

    const ids = renovationIds(input);

    assert.ok(!ids.includes("envelope_roof"));
    assert.ok(ids.includes("envelope_topFloor"));
  });
});

describe("generateInsulationRenovations — insulation recommendation", () => {
  test("uses the year fallback when hasInsulation is false", () => {
    const oldInput = baseInput();
    oldInput.bottomFloor.hasInsulation = false;
    oldInput.bottomFloor.year = 1970;

    const recentInput = baseInput();
    recentInput.bottomFloor.hasInsulation = false;
    recentInput.bottomFloor.year = 1990;

    const oldRenovation = generate(oldInput).find(
      (renovation) => renovation.id === "envelope_bottomFloor",
    );
    const recentRenovation = generate(recentInput).find(
      (renovation) => renovation.id === "envelope_bottomFloor",
    );

    assert.equal(oldRenovation?.recommended, false);
    assert.equal(recentRenovation?.recommended, true);
  });

  test("uses the year fallback when hasInsulation is unknown", () => {
    const oldInput = baseInput();
    oldInput.bottomFloor.year = 1970;

    const recentInput = baseInput();
    recentInput.bottomFloor.year = 1990;

    const oldRenovation = generate(oldInput).find(
      (renovation) => renovation.id === "envelope_bottomFloor",
    );
    const recentRenovation = generate(recentInput).find(
      (renovation) => renovation.id === "envelope_bottomFloor",
    );

    assert.equal(oldRenovation?.recommended, false);
    assert.equal(recentRenovation?.recommended, true);
  });

  test("does not recommend when hasInsulation is true", () => {
    const input = baseInput();
    input.bottomFloor.hasInsulation = true;
    input.bottomFloor.year = 1990;

    const renovation = generate(input).find(
      (entry) => entry.id === "envelope_bottomFloor",
    );

    assert.equal(renovation?.recommended, false);
  });
});

describe("generateHeatingRenovations — system renewal opt-out", () => {
  function hasRenewal(
    config = baseConfig(),
    input = baseInput(),
  ): boolean {
    const localizedConfig = structuredClone(config);
    for (const renovation of localizedConfig.renovation.heatingRenovations) {
      renovation.localization.en ??= "Heating renovation";
    }
    return generateHeatingRenovations(localizedConfig, input, "en", "Renew system").some(
      (renovation) => renovation.id === "heat_renew",
    );
  }

  test("generates renewal when neither carrier nor system opts out", () => {
    assert.equal(hasRenewal(), true);
  });

  test("does not generate renewal when the resolved carrier opts out", () => {
    const config = baseConfig();
    config.heat.primaryEnergyCarriers[0]!.excludeFromSystemRenewal = true;

    assert.equal(hasRenewal(config), false);
  });

  test("does not generate renewal when the resolved system opts out", () => {
    const config = baseConfig();
    config.heat.heatingSystemTypes[0]!.excludeFromSystemRenewal = true;

    assert.equal(hasRenewal(config), false);
  });

  test("uses resolved defaults when input carrier and system are omitted", () => {
    const input = baseInput();
    input.heat.primaryEnergyCarrier = null;
    input.heat.heatingSystemType = null;

    assert.equal(hasRenewal(DEFAULT_CONFIG, input), false);
  });
});
