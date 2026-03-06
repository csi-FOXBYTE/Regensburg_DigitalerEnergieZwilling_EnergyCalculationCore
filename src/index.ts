export { calculateCore } from "./core/calculate-core";

export type { CoreConfig, CoreInput, CoreResult } from "./core/types";
export type { YearBand, YearBandRange, UValueCatalog, UValueCatalogMap, UValueSource } from "./catalogs/types";
export { resolveUValue } from "./catalogs/u-value";

export type {
  AgeRecommendationRule,
  EnvelopeConfig,
  EnvelopeRecommendationConfig,
  EnvelopeRecommendation,
  HtBlock,
  RecommendationAction,
  RoofWindowInput,
  RoofWindowResult,
  SingleSurfaceResult,
  SurfaceInput,
  WallWindowInput,
  WallWindowResult,
} from "./envelope/types";

export { calculateRoofWindow, calculateSingleSurface, calculateWallWindow } from "./envelope/calculators";

export type {
  EnergyCarrier,
  HeatingConfig,
  HeatingInput,
  HeatingMode,
  HeatingRecommendation,
  HeatingRecommendationAction,
  HeatingResult,
} from "./heating/types";

export { calculateHeating } from "./heating/calculator";
export type { CoreConfigJson, JsonConstructionConfig } from "./config/core-config-json";
export { coreConfigFromJson } from "./config/core-config-json";
export { defaultCoreConfig, defaultCoreConfigJson } from "./config/default-core-config";
