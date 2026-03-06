import { resolveUValue } from "../catalogs/u-value";
import { safeDivide } from "../shared/math";
import { evaluateAgeRecommendation } from "./recommendations";
import type {
  EnvelopeConfig,
  HtBlock,
  RoofWindowInput,
  RoofWindowResult,
  SingleSurfaceResult,
  SurfaceInput,
  WallWindowInput,
  WallWindowResult,
} from "./types";

/**
 * Calculates roof + roof-window transmission heat losses and derived indicators.
 *
 * Formula basis:
 * - `HT = F * U * A` per component
 * - `bridgeHt = deltaUwb * referenceArea`
 * - `totalHt = sumHt + bridgeHt`
 * - `htPrime = totalHt / referenceArea`
 *
 * @param input - Roof/roof-window input values including optional overrides.
 * @param config - Envelope calculation configuration.
 * @returns Detailed component result plus recommendations.
 * @group Envelope
 */
export function calculateRoofWindow(input: RoofWindowInput, config: EnvelopeConfig): RoofWindowResult {
  const roof = toHtBlock(input.roof, config);
  const roofWindow = toHtBlock(input.roofWindow, config);
  const sumHt = roof.ht + roofWindow.ht;
  const referenceArea = input.envelopeArea ?? roof.area + roofWindow.area;
  const deltaUwb = input.deltaUwb ?? config.defaultDeltaUwb;
  const bridgeHt = deltaUwb * referenceArea;
  const totalHt = sumHt + bridgeHt;

  const recommendations = [
    evaluateAgeRecommendation("roof", input.roof.ageYears, config.recommendations.roof),
    evaluateAgeRecommendation("roofWindow", input.roofWindow.ageYears, config.recommendations.roofWindow),
  ].filter((entry) => entry !== undefined);

  return {
    roof,
    roofWindow,
    sumHt,
    bridgeHt,
    totalHt,
    referenceArea,
    htPrime: safeDivide(totalHt, referenceArea),
    recommendations,
  };
}

/**
 * Calculates external-wall + window transmission heat losses and derived indicators.
 *
 * Formula basis:
 * - `HT = F * U * A` per component
 * - `totalHt = htWall + htWindow`
 * - `htPrime = totalHt / referenceArea`
 *
 * @param input - Wall/window input values including optional reference-area override.
 * @param config - Envelope calculation configuration.
 * @returns Detailed component result plus recommendations.
 * @group Envelope
 */
export function calculateWallWindow(input: WallWindowInput, config: EnvelopeConfig): WallWindowResult {
  const wall = toHtBlock(input.wall, config);
  const window = toHtBlock(input.window, config);
  const totalHt = wall.ht + window.ht;
  const referenceArea = input.envelopeArea ?? wall.area + window.area;

  const recommendations = [
    evaluateAgeRecommendation("wall", input.wall.ageYears, config.recommendations.wall),
    evaluateAgeRecommendation("wallWindow", input.window.ageYears, config.recommendations.wallWindow),
  ].filter((entry) => entry !== undefined);

  return {
    wall,
    window,
    totalHt,
    referenceArea,
    htPrime: safeDivide(totalHt, referenceArea),
    recommendations,
  };
}

/**
 * Calculates a single surface transmission heat loss block.
 *
 * @param input - Single surface input values.
 * @param rules - Age-based recommendation rules for this component.
 * @param component - Component identifier used in recommendation output.
 * @param config - Envelope calculation configuration.
 * @returns Surface HT result plus optional recommendation.
 * @group Envelope
 */
export function calculateSingleSurface(
  input: SurfaceInput,
  rules: readonly import("./types").AgeRecommendationRule[],
  component: string,
  config: EnvelopeConfig,
): SingleSurfaceResult {
  const surface = toHtBlock(input, config);
  const recommendation = evaluateAgeRecommendation(component, input.ageYears, rules);

  return {
    surface,
    totalHt: surface.ht,
    referenceArea: surface.area,
    htPrime: safeDivide(surface.ht, surface.area),
    recommendations: recommendation ? [recommendation] : [],
  };
}

/**
 * Converts a surface input into a normalized HT block (`A`, `U`, `F`, `HT`).
 *
 * @param input - Surface input (direct U-value or catalog lookup).
 * @param config - Envelope calculation configuration.
 * @returns Normalized HT block.
 */
function toHtBlock(input: SurfaceInput, config: EnvelopeConfig): HtBlock {
  const uValue = resolveUValue(input, config.catalogs);
  const factor = input.factor ?? config.defaultFactor;

  return {
    area: input.area,
    uValue,
    factor,
    ht: factor * uValue * input.area,
  };
}
