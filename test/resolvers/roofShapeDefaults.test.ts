import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { DETEnergyCaluclator } from "../../src/calculators/energy/index.js";
import { calculate } from "../../src/calculate.js";
import { DEFAULT_CONFIG } from "../../src/types/config/default-config.js";
import { baseInput } from "../validators/fixtures.js";

describe("roof-shape defaults", () => {
  test("assumes no attic and solid construction for a flat roof", () => {
    const input = baseInput();
    input.roof.isFlatRoof = true;
    const ctx = DETEnergyCaluclator({ config: DEFAULT_CONFIG, input });

    assert.strictEqual(ctx.get("isFlatRoof"), true);
    assert.strictEqual(ctx.get("hasAttic"), false);
    assert.strictEqual(ctx.get("isAtticHeated"), false);
    assert.strictEqual(ctx.get("roofConstructionType"), "solid_construction");
  });

  test("assumes an unheated attic and wood construction for a non-flat roof", () => {
    const input = baseInput();
    input.roof.isFlatRoof = false;
    const ctx = DETEnergyCaluclator({ config: DEFAULT_CONFIG, input });

    assert.strictEqual(ctx.get("hasAttic"), true);
    assert.strictEqual(ctx.get("isAtticHeated"), false);
    assert.strictEqual(ctx.get("roofConstructionType"), "wood_construction");
  });

  test("explicit values override roof-shape assumptions", () => {
    const input = baseInput();
    input.roof.isFlatRoof = true;
    input.roof.constructionType = "wood_construction";
    input.topFloor.hasAttic = true;
    input.topFloor.isAtticHeated = true;
    const ctx = DETEnergyCaluclator({ config: DEFAULT_CONFIG, input });

    assert.strictEqual(ctx.get("hasAttic"), true);
    assert.strictEqual(ctx.get("isAtticHeated"), true);
    assert.strictEqual(ctx.get("roofConstructionType"), "wood_construction");
  });

  test("uses the configured roof-shape assumption when roof shape is unavailable", () => {
    const input = baseInput();
    const ctx = DETEnergyCaluclator({ config: DEFAULT_CONFIG, input });

    assert.strictEqual(ctx.get("isFlatRoof"), false);
    assert.strictEqual(ctx.get("hasAttic"), true);
    assert.strictEqual(ctx.get("isAtticHeated"), false);
    assert.strictEqual(ctx.get("roofConstructionType"), "wood_construction");
  });

  test("allows the missing roof-shape assumption to be configured", () => {
    const input = baseInput();
    const config = structuredClone(DEFAULT_CONFIG);
    config.roof.defaultIsFlatRoof = true;
    const ctx = DETEnergyCaluclator({ config, input });

    assert.strictEqual(ctx.get("isFlatRoof"), true);
    assert.strictEqual(ctx.get("hasAttic"), false);
    assert.strictEqual(ctx.get("roofConstructionType"), "solid_construction");
  });

  test("includes the roof shape and derived assumptions in resolved input", () => {
    const input = baseInput();
    input.roof.isFlatRoof = false;

    const result = calculate(DEFAULT_CONFIG, input);

    assert.strictEqual(result.resolvedInput.roof.isFlatRoof, false);
    assert.strictEqual(result.resolvedInput.roof.constructionType, "wood_construction");
    assert.strictEqual(result.resolvedInput.topFloor.hasAttic, true);
    assert.strictEqual(result.resolvedInput.topFloor.isAtticHeated, false);
  });
});
