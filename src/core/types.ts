import type { EnvelopeConfig, RoofWindowInput, SingleSurfaceResult, SurfaceInput, WallWindowInput } from "../envelope/types";
import type { HeatingConfig, HeatingInput, HeatingResult } from "../heating/types";
import type { RoofWindowResult, WallWindowResult } from "../envelope/types";

/**
 * Top-level input payload for the core orchestrator.
 *
 * @group Core
 */
export type CoreInput = Readonly<{
  roofWindow?: RoofWindowInput;
  wallWindow?: WallWindowInput;
  ogd?: SurfaceInput;
  ugd?: SurfaceInput;
  heating?: HeatingInput;
  aggregateReferenceAreaOverride?: number;
}>;

/**
 * Top-level runtime configuration for all domains.
 *
 * @group Core
 */
export type CoreConfig = Readonly<{
  envelope: EnvelopeConfig;
  heating: HeatingConfig;
}>;

/**
 * Top-level output payload of the core orchestrator.
 *
 * @group Core
 */
export type CoreResult = Readonly<{
  roofWindow?: RoofWindowResult;
  wallWindow?: WallWindowResult;
  ogd?: SingleSurfaceResult;
  ugd?: SingleSurfaceResult;
  heating?: HeatingResult;
  aggregate: Readonly<{
    totalHt: number;
    totalReferenceArea: number;
    htPrime: number;
  }>;
}>;
