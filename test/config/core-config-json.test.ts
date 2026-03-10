import test from "node:test";
import assert from "node:assert/strict";

import { coreConfigFromJson } from "../../src/config/core-config-json";
import { defaultCoreConfigJson } from "../../src/config/default-core-config";

const baseHeatingConfig = defaultCoreConfigJson.heating;
const baseEnergyConfig = defaultCoreConfigJson.energy;

test("coreConfigFromJson keeps explicit year bands from the default config", () => {
  const config = coreConfigFromJson(defaultCoreConfigJson);
  const category1 = config.envelope.catalogs.category1;
  assert.ok(category1);
  const bands = category1.roof_massive;

  assert.ok(bands);
  assert.equal(bands.length, 9);
  assert.deepEqual(bands[0], { to: 1918, value: 2.1 });
  assert.deepEqual(bands[8], { from: 2002, value: 0.2 });
});

test("coreConfigFromJson keeps explicit window bands and component defaults", () => {
  const config = coreConfigFromJson(defaultCoreConfigJson);
  const category1 = config.envelope.catalogs.category1;

  assert.ok(category1);
  assert.deepEqual(category1.window_wood_double?.[0], { to: 1978, value: 2.7 });
  assert.deepEqual(category1.window_wood_double?.[4], { from: 2002, value: 1.5 });
  assert.deepEqual(category1.window_pvc_iso?.[2], { from: 1984, to: 1994, value: 3.0 });
  assert.equal(config.envelope.componentDefaults?.roofWindow?.factor, 0.93);
});

test("coreConfigFromJson accepts explicit year bands as JSON object", () => {
  const config = coreConfigFromJson({
    envelope: {
      defaultFactor: 1,
      defaultDeltaUwb: 0.1,
      catalogs: {
        c1: {
          wall: [
            { to: 2000, value: 1.2 },
            { from: 2001, value: 0.5 },
          ],
        },
      },
      recommendations: {
        roof: [],
        roofWindow: [],
        wall: [],
        wallWindow: [],
        topFloorCeiling: [],
        lowestFloor: [],
      },
    },
    heating: {
      ...baseHeatingConfig,
      noActionTypes: [],
      directReplaceTypes: [],
    },
    energy: baseEnergyConfig,
  });

  const c1 = config.envelope.catalogs.c1;
  assert.ok(c1);
  assert.equal(c1.wall?.[0]?.value, 1.2);
  assert.equal(c1.wall?.[1]?.value, 0.5);
});

test("coreConfigFromJson throws for empty construction config", () => {
  assert.throws(
    () =>
      coreConfigFromJson({
        envelope: {
          defaultFactor: 1,
          defaultDeltaUwb: 0.1,
          catalogs: { c1: { roof: [] } },
          recommendations: {
            roof: [],
            roofWindow: [],
            wall: [],
            wallWindow: [],
            topFloorCeiling: [],
            lowestFloor: [],
          },
        },
        heating: {
          ...baseHeatingConfig,
          noActionTypes: [],
          directReplaceTypes: [],
        },
        energy: baseEnergyConfig,
      }),
    /must not be empty/,
  );
});
