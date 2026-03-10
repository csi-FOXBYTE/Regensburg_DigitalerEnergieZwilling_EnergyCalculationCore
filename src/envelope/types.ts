import type { UValueCatalogMap, UValueSource } from "../catalogs/types";
import type { RuleCondition, RuleValue } from "../shared/rule-conditions";

/**
 * Supported per-surface identifiers for envelope defaults.
 *
 * @group Envelope
 */
export type EnvelopeSurfaceKind = "roof" | "roofWindow" | "wall" | "window" | "topFloorCeiling" | "lowestFloor";

/**
 * Optional LOD2/LOD3 metadata for envelope surfaces.
 *
 * @group Envelope
 */
export type SurfaceDetails = Readonly<{
  insulationPresent?: boolean;
  insulationThicknessM?: number;
  insulationConductivityWPerMK?: number;
  insulationAgeYears?: number;
  heatedSpaceAdjacent?: boolean;
  roofShape?: string;
  constructionType?: string;
  frameType?: string;
  glazingType?: string;
  areaSource?: string;
  uValueSource?: string;
  renovationRequested?: boolean;
  attributes?: Readonly<Record<string, RuleValue>>;
}>;

/**
 * Input for a single envelope surface.
 *
 * @group Envelope
 */
export type SurfaceInput<TCatalogs extends UValueCatalogMap = UValueCatalogMap> = UValueSource<TCatalogs> &
  Readonly<{
    area: number;
    factor?: number;
    ageYears?: number;
    details?: SurfaceDetails;
  }>;

/**
 * Input for the roof + roof-window block.
 *
 * @group Envelope
 */
export type RoofWindowInput<TCatalogs extends UValueCatalogMap = UValueCatalogMap> = Readonly<{
  roof: SurfaceInput<TCatalogs>;
  roofWindow: SurfaceInput<TCatalogs>;
  deltaUwb?: number;
  envelopeArea?: number;
}>;

/**
 * Input for the wall + window block.
 *
 * @group Envelope
 */
export type WallWindowInput<TCatalogs extends UValueCatalogMap = UValueCatalogMap> = Readonly<{
  wall: SurfaceInput<TCatalogs>;
  window: SurfaceInput<TCatalogs>;
  envelopeArea?: number;
}>;

/**
 * Normalized transmission-heat-loss block.
 *
 * @group Envelope
 */
export type HtBlock = Readonly<{
  area: number;
  uValue: number;
  factor: number;
  ht: number;
}>;

/**
 * Supported recommendation action set for envelope components.
 *
 * @group Envelope
 */
export type RecommendationAction = "none" | "insulate" | "replace" | "replace_insulation" | "full_renovation";

/**
 * Recommendation payload for one envelope component.
 *
 * @group Envelope
 */
export type EnvelopeRecommendation = Readonly<{
  component: string;
  action: RecommendationAction;
  reason: string;
  targetUValue?: number;
}>;

/**
 * Age-based recommendation rule.
 *
 * @group Envelope
 */
export type AgeRecommendationRule = Readonly<{
  minAge?: number;
  maxAge?: number;
  conditions?: readonly RuleCondition[];
  action: RecommendationAction;
  reason: string;
  targetUValue?: number;
}>;

/**
 * Optional component-specific defaults used when an input does not provide
 * an explicit value.
 *
 * @group Envelope
 */
export type EnvelopeComponentDefaults = Readonly<
  Partial<
    Record<
      EnvelopeSurfaceKind,
      Readonly<{
        factor?: number;
      }>
    >
  >
>;

/**
 * Recommendation rules grouped by envelope component.
 *
 * @group Envelope
 */
export type EnvelopeRecommendationConfig = Readonly<{
  roof: readonly AgeRecommendationRule[];
  roofWindow: readonly AgeRecommendationRule[];
  wall: readonly AgeRecommendationRule[];
  wallWindow: readonly AgeRecommendationRule[];
  topFloorCeiling: readonly AgeRecommendationRule[];
  lowestFloor: readonly AgeRecommendationRule[];
}>;

/**
 * Runtime envelope-domain configuration.
 *
 * @group Envelope
 */
export type EnvelopeConfig<TCatalogs extends UValueCatalogMap = UValueCatalogMap> = Readonly<{
  defaultFactor: number;
  defaultDeltaUwb: number;
  catalogs: TCatalogs;
  recommendations: EnvelopeRecommendationConfig;
  componentDefaults?: EnvelopeComponentDefaults;
}>;

/**
 * Result of the roof + roof-window block.
 *
 * @group Envelope
 */
export type RoofWindowResult = Readonly<{
  roof: HtBlock;
  roofWindow: HtBlock;
  sumHt: number;
  bridgeHt: number;
  totalHt: number;
  referenceArea: number;
  htPrime: number;
  recommendations: readonly EnvelopeRecommendation[];
}>;

/**
 * Result of the wall + window block.
 *
 * @group Envelope
 */
export type WallWindowResult = Readonly<{
  wall: HtBlock;
  window: HtBlock;
  totalHt: number;
  referenceArea: number;
  htPrime: number;
  recommendations: readonly EnvelopeRecommendation[];
}>;

/**
 * Result of a single-surface block.
 *
 * @group Envelope
 */
export type SingleSurfaceResult = Readonly<{
  surface: HtBlock;
  totalHt: number;
  referenceArea: number;
  htPrime: number;
  recommendations: readonly EnvelopeRecommendation[];
}>;
