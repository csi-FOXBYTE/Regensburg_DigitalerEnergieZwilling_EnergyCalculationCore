import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { detectMigrations, validateAndMigrate } from "../../src/validators/index.js";
import { baseConfig } from "./fixtures.js";

const MISSING_RECOMMENDED = {
  path: "renovation.heatingSurfaceRenovations.0.recommendedForSystems",
  message: "Required",
};

// ── detectMigrations ──────────────────────────────────────────────────────────

describe("detectMigrations", () => {
  test("returns migrator when all issues are recommendedForSystems", () => {
    const result = detectMigrations({}, [MISSING_RECOMMENDED]);
    assert.strictEqual(result.length, 1);
    const migrator = result[0];
    assert.ok(migrator);
    assert.strictEqual(migrator.id, "add-recommended-for-systems");
  });

  test("deduplicates — same migrator returned once for multiple matching issues", () => {
    const issues = [
      { path: "renovation.heatingSurfaceRenovations.0.recommendedForSystems", message: "Required" },
      { path: "renovation.heatingSurfaceRenovations.1.recommendedForSystems", message: "Required" },
    ];
    const result = detectMigrations({}, issues);
    assert.strictEqual(result.length, 1);
  });

  test("returns empty when any issue is not fixable", () => {
    const issues = [
      MISSING_RECOMMENDED,
      { path: "heat.defaultPrimaryEnergyCarrier", message: "not in primaryEnergyCarriers" },
    ];
    assert.strictEqual(detectMigrations({}, issues).length, 0);
  });

  test("returns empty for empty issues list", () => {
    assert.strictEqual(detectMigrations({}, []).length, 0);
  });
});

// ── add-recommended-for-systems migrator (via detectMigrations) ───────────────

describe("add-recommended-for-systems migrator", () => {
  function getMigrator() {
    const migrators = detectMigrations({}, [MISSING_RECOMMENDED]);
    const migrator = migrators[0];
    assert.ok(migrator);
    return migrator;
  }

  test("sets empty array for unknown surface type", () => {
    const raw = {
      heat: { heatingSystemTypes: [{ value: "boiler" }] },
      renovation: {
        heatingSurfaceRenovations: [{ targetSurfaceType: "unknown_surface" }],
      },
    };
    const result = getMigrator().migrate(raw) as any;
    assert.deepStrictEqual(
      result.renovation.heatingSurfaceRenovations[0].recommendedForSystems,
      [],
    );
  });

  test("sets default systems for known surface type", () => {
    const raw = {
      heat: {
        heatingSystemTypes: [
          { value: "air_source_heat_pump_lt_40" },
          { value: "ground_source_heat_pump_lt_40" },
          { value: "boiler" },
        ],
      },
      renovation: {
        heatingSurfaceRenovations: [{ targetSurfaceType: "radiant_surface_heating" }],
      },
    };
    const result = getMigrator().migrate(raw) as any;
    assert.deepStrictEqual(
      result.renovation.heatingSurfaceRenovations[0].recommendedForSystems,
      ["air_source_heat_pump_lt_40", "ground_source_heat_pump_lt_40"],
    );
  });

  test("filters default systems to those present in config", () => {
    const raw = {
      heat: {
        heatingSystemTypes: [{ value: "air_source_heat_pump_lt_40" }],
      },
      renovation: {
        heatingSurfaceRenovations: [{ targetSurfaceType: "radiant_surface_heating" }],
      },
    };
    const result = getMigrator().migrate(raw) as any;
    assert.deepStrictEqual(
      result.renovation.heatingSurfaceRenovations[0].recommendedForSystems,
      ["air_source_heat_pump_lt_40"],
    );
  });

  test("skips entries that already have recommendedForSystems", () => {
    const raw = {
      heat: { heatingSystemTypes: [] },
      renovation: {
        heatingSurfaceRenovations: [
          { targetSurfaceType: "radiant_surface_heating", recommendedForSystems: ["existing"] },
        ],
      },
    };
    const result = getMigrator().migrate(raw) as any;
    assert.deepStrictEqual(
      result.renovation.heatingSurfaceRenovations[0].recommendedForSystems,
      ["existing"],
    );
  });
});

// ── validateAndMigrate ────────────────────────────────────────────────────────

describe("validateAndMigrate", () => {
  test("returns success, migrated:false for already valid config", () => {
    const result = validateAndMigrate(baseConfig());
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.migrated, false);
  });

  test("migrates missing recommendedForSystems and returns success, migrated:true", () => {
    const raw = structuredClone(baseConfig()) as any;
    delete raw.renovation.heatingSurfaceRenovations[0].recommendedForSystems;
    const result = validateAndMigrate(raw);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.migrated, true);
  });

  test("returns failure, migrated:false for non-migratable errors", () => {
    const raw = structuredClone(baseConfig()) as any;
    raw.heat.defaultPrimaryEnergyCarrier = "nonexistent";
    const result = validateAndMigrate(raw);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.migrated, false);
  });
});
