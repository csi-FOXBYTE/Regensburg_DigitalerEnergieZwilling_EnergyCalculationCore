import type { UValueCatalogMap } from "../catalogs/types";
import { resolveUValue } from "../catalogs/u-value";
import { safeDivide } from "../shared/math";
import { evaluateAgeRecommendation } from "./recommendations";
import type {
  EnvelopeConfig,
  EnvelopeSurfaceKind,
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
export function calculateRoofWindow<TCatalogs extends UValueCatalogMap>(
  input: RoofWindowInput<TCatalogs>,
  config: EnvelopeConfig<TCatalogs>,
): RoofWindowResult {
  const roof = toHtBlock(input.roof, "roof", config);
  const roofWindow = toHtBlock(input.roofWindow, "roofWindow", config);
  const sumHt = roof.ht + roofWindow.ht;
  const referenceArea = input.envelopeArea ?? roof.area + roofWindow.area;
  const deltaUwb = input.deltaUwb ?? config.defaultDeltaUwb;
  const bridgeHt = deltaUwb * referenceArea;
  const totalHt = sumHt + bridgeHt;

  const recommendations = [
    evaluateAgeRecommendation("roof", input.roof, config.recommendations.roof),
    evaluateAgeRecommendation("roofWindow", input.roofWindow, config.recommendations.roofWindow),
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
export function calculateWallWindow<TCatalogs extends UValueCatalogMap>(
  input: WallWindowInput<TCatalogs>,
  config: EnvelopeConfig<TCatalogs>,
): WallWindowResult {
  const wall = toHtBlock(input.wall, "wall", config);
  const window = toHtBlock(input.window, "window", config);
  const totalHt = wall.ht + window.ht;
  const referenceArea = input.envelopeArea ?? wall.area + window.area;

  const recommendations = [
    evaluateAgeRecommendation("wall", input.wall, config.recommendations.wall),
    evaluateAgeRecommendation("wallWindow", input.window, config.recommendations.wallWindow),
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
export function calculateSingleSurface<TCatalogs extends UValueCatalogMap>(
  input: SurfaceInput<TCatalogs>,
  rules: readonly import("./types").AgeRecommendationRule[],
  component: string,
  config: EnvelopeConfig<TCatalogs>,
): SingleSurfaceResult {
  const surface = toHtBlock(input, component as EnvelopeSurfaceKind, config);
  const recommendation = evaluateAgeRecommendation(component, input, rules);

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
function toHtBlock<TCatalogs extends UValueCatalogMap>(
  input: SurfaceInput<TCatalogs>,
  component: EnvelopeSurfaceKind,
  config: EnvelopeConfig<TCatalogs>,
): HtBlock {
  const uValue = resolveUValue(input, config.catalogs);
  const factor = input.factor ?? config.componentDefaults?.[component]?.factor ?? config.defaultFactor;

  return {
    area: input.area,
    uValue,
    factor,
    ht: factor * uValue * input.area,
  };
}
