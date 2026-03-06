import type { UValueCatalogMap, UValueSource } from "../catalogs/types";

/**
 * Input for a single envelope surface.
 *
 * @group Envelope
 */
export type SurfaceInput = UValueSource &
  Readonly<{
    area: number;
    factor?: number;
    ageYears?: number;
  }>;

/**
 * Input for the roof + roof-window block.
 *
 * @group Envelope
 */
export type RoofWindowInput = Readonly<{
  roof: SurfaceInput;
  roofWindow: SurfaceInput;
  deltaUwb?: number;
  envelopeArea?: number;
}>;

/**
 * Input for the wall + window block.
 *
 * @group Envelope
 */
export type WallWindowInput = Readonly<{
  wall: SurfaceInput;
  window: SurfaceInput;
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
export type RecommendationAction = "none" | "insulate" | "replace" | "full_renovation";

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
  action: RecommendationAction;
  reason: string;
  targetUValue?: number;
}>;

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
  ogd: readonly AgeRecommendationRule[];
  ugd: readonly AgeRecommendationRule[];
}>;

/**
 * Runtime envelope-domain configuration.
 *
 * @group Envelope
 */
export type EnvelopeConfig = Readonly<{
  defaultFactor: number;
  defaultDeltaUwb: number;
  catalogs: UValueCatalogMap;
  recommendations: EnvelopeRecommendationConfig;
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
