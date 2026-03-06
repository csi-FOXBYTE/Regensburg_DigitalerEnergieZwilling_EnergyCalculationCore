import test from "node:test";
import assert from "node:assert/strict";

import { defaultCoreConfig } from "../../../src/config/default-core-config";
import { calculateHeating } from "../../../src/heating/calculator";

const config = defaultCoreConfig.heating;

test("calculateHeating returns none for whitelisted no-action types", () => {
  const result = calculateHeating(
    {
      mode: "central",
      primaryCarrier: "electricity",
      primaryType: "air_water_heat_pump",
      yearOfConstruction: 1990,
    },
    config,
  );

  assert.equal(result.ageYears, 36);
  assert.equal(result.recommendation.action, "none");
});

test("calculateHeating applies direct replace rule before age rule", () => {
  const result = calculateHeating(
    {
      mode: "central",
      primaryCarrier: "gas",
      primaryType: "standard_boiler_gas",
      yearOfConstruction: 2020,
    },
    config,
  );

  assert.equal(result.ageYears, 6);
  assert.equal(result.recommendation.action, "replace");
  assert.equal(result.recommendation.preferredReplacement, "air_water_heat_pump");
});

test("calculateHeating returns replace by age threshold", () => {
  const result = calculateHeating(
    {
      mode: "central",
      primaryCarrier: "oil",
      primaryType: "condensing_boiler_oil",
      yearOfConstruction: 1990,
    },
    config,
  );

  assert.equal(result.ageYears, 36);
  assert.equal(result.recommendation.action, "replace");
});

test("calculateHeating returns optimize between optimize and replace threshold", () => {
  const result = calculateHeating(
    {
      mode: "central",
      primaryCarrier: "other",
      primaryType: "condensing_boiler_custom",
      yearOfConstruction: 2010,
    },
    config,
  );

  assert.equal(result.ageYears, 16);
  assert.equal(result.recommendation.action, "optimize");
});

test("calculateHeating handles missing year with none action", () => {
  const result = calculateHeating(
    {
      mode: "decentral",
      primaryCarrier: "other",
      primaryType: "unknown",
    },
    config,
  );

  assert.equal(result.ageYears, undefined);
  assert.equal(result.recommendation.action, "none");
});
