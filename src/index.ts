export { calculateCore } from "./core/calculate-core";

export type { CoreConfig, CoreInput, CoreResult } from "./core/types";
export type {
  CatalogName,
  ConstructionName,
  UValueCatalog,
  UValueCatalogMap,
  UValueLookupSource,
  UValueSource,
  YearBand,
  YearBandRange,
} from "./catalogs/types";
export { resolveUValue } from "./catalogs/u-value";
export type {
  EnergyCalculationContext,
  EnergyConfig,
  EnergyInput,
  EnergyResult,
  FuelCarrierProfile,
  SolarGainInput,
} from "./energy/types";
export { calculateEnergy } from "./energy/calculator";

export type {
  AgeRecommendationRule,
  EnvelopeComponentDefaults,
  EnvelopeConfig,
  EnvelopeRecommendationConfig,
  EnvelopeRecommendation,
  EnvelopeSurfaceKind,
  HtBlock,
  RecommendationAction,
  RoofWindowInput,
  RoofWindowResult,
  SurfaceDetails,
  SingleSurfaceResult,
  SurfaceInput,
  WallWindowInput,
  WallWindowResult,
} from "./envelope/types";

export { calculateRoofWindow, calculateSingleSurface, calculateWallWindow } from "./envelope/calculators";

export type {
  EnergyCarrier,
  HeatingConfig,
  HeatingDetails,
  HeatingInput,
  HeatingTypeFromConfig,
  HeatingTypeFromConfigs,
  HeatingMode,
  LiteralUnion,
  HeatingRecommendation,
  HeatingRecommendationRule,
  HeatingRecommendationAction,
  HeatingResult,
} from "./heating/types";

export type { RuleCondition, RuleValue } from "./shared/rule-conditions";

export { calculateHeating } from "./heating/calculator";
export type {
  CoreConfigJson,
  JsonCatalogConfig,
  JsonCatalogConfigMap,
  JsonConstructionConfig,
  NormalizedCatalogMap,
} from "./config/core-config-json";
export type { CoreConfigJsonSchemaSource } from "./config/core-config-schema-source";
export { coreConfigFromJson } from "./config/core-config-json";
export { defaultCoreConfig, defaultCoreConfigJson } from "./config/default-core-config";
