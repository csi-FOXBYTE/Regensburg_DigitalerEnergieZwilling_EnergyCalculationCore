import test from "node:test";
import assert from "node:assert/strict";

import { coreConfigFromJson } from "../../src/config/core-config-json";
import { defaultCoreConfigJson } from "../../src/config/default-core-config";

test("coreConfigFromJson converts 9-value arrays to year bands", () => {
  const config = coreConfigFromJson(defaultCoreConfigJson);
  const category1 = config.envelope.catalogs.category1;
  assert.ok(category1);
  const bands = category1.roof_massive;

  assert.ok(bands);
  assert.equal(bands.length, 9);
  assert.deepEqual(bands[0], { to: 1918, value: 2.1 });
  assert.deepEqual(bands[8], { from: 2002, value: 0.2 });
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
        ogd: [],
        ugd: [],
      },
    },
    heating: {
      referenceYear: 2026,
      optimizeAfterYears: 15,
      replaceAfterYears: 25,
      noActionTypes: [],
      directReplaceTypes: [],
      replacementByCarrier: {
        oil: "air_water_heat_pump",
        gas: "air_water_heat_pump",
        biomass: "pellet_boiler",
        electricity: "air_water_heat_pump",
        district_heating: "district_heating",
        other: "air_water_heat_pump",
      },
    },
  });

  const c1 = config.envelope.catalogs.c1;
  assert.ok(c1);
  assert.equal(c1.wall?.[0]?.value, 1.2);
  assert.equal(c1.wall?.[1]?.value, 0.5);
});

test("coreConfigFromJson supports numeric arrays with more than 9 values", () => {
  const config = coreConfigFromJson({
    envelope: {
      defaultFactor: 1,
      defaultDeltaUwb: 0.1,
      yearBandLayout: [
        { to: 1900 },
        { from: 1901, to: 1910 },
        { from: 1911, to: 1920 },
        { from: 1921, to: 1930 },
        { from: 1931, to: 1940 },
        { from: 1941, to: 1950 },
        { from: 1951, to: 1960 },
        { from: 1961, to: 1970 },
        { from: 1971, to: 1980 },
        { from: 1981 },
      ],
      catalogs: {
        c1: {
          roof: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      },
      recommendations: {
        roof: [],
        roofWindow: [],
        wall: [],
        wallWindow: [],
        ogd: [],
        ugd: [],
      },
    },
    heating: {
      referenceYear: 2026,
      optimizeAfterYears: 15,
      replaceAfterYears: 25,
      noActionTypes: [],
      directReplaceTypes: [],
      replacementByCarrier: {
        oil: "air_water_heat_pump",
        gas: "air_water_heat_pump",
        biomass: "pellet_boiler",
        electricity: "air_water_heat_pump",
        district_heating: "district_heating",
        other: "air_water_heat_pump",
      },
    },
  });

  const c1 = config.envelope.catalogs.c1;
  assert.ok(c1);
  assert.equal(c1.roof?.length, 10);
  assert.equal(c1.roof?.[9]?.value, 10);
});

test("coreConfigFromJson throws when numeric array is used without yearBandLayout", () => {
  assert.throws(
    () =>
      coreConfigFromJson({
        envelope: {
          defaultFactor: 1,
          defaultDeltaUwb: 0.1,
          catalogs: { c1: { roof: [1, 2] } },
          recommendations: {
            roof: [],
            roofWindow: [],
            wall: [],
            wallWindow: [],
            ogd: [],
            ugd: [],
          },
        },
        heating: {
          referenceYear: 2026,
          optimizeAfterYears: 15,
          replaceAfterYears: 25,
          noActionTypes: [],
          directReplaceTypes: [],
          replacementByCarrier: {
            oil: "air_water_heat_pump",
            gas: "air_water_heat_pump",
            biomass: "pellet_boiler",
            electricity: "air_water_heat_pump",
            district_heating: "district_heating",
            other: "air_water_heat_pump",
          },
        },
      }),
    /Missing 'yearBandLayout'/,
  );
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
            ogd: [],
            ugd: [],
          },
        },
        heating: {
          referenceYear: 2026,
          optimizeAfterYears: 15,
          replaceAfterYears: 25,
          noActionTypes: [],
          directReplaceTypes: [],
          replacementByCarrier: {
            oil: "air_water_heat_pump",
            gas: "air_water_heat_pump",
            biomass: "pellet_boiler",
            electricity: "air_water_heat_pump",
            district_heating: "district_heating",
            other: "air_water_heat_pump",
          },
        },
      }),
    /must not be empty/,
  );
});
