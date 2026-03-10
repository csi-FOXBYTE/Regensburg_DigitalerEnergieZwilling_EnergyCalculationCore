import type { UValueCatalogMap } from "../catalogs/types";
import type { EnvelopeConfig, RoofWindowInput, SingleSurfaceResult, SurfaceInput, WallWindowInput } from "../envelope/types";
import type { EnergyConfig, EnergyInput, EnergyResult } from "../energy/types";
import type { HeatingConfig, HeatingInput, HeatingResult } from "../heating/types";
import type { RoofWindowResult, WallWindowResult } from "../envelope/types";

/**
 * Top-level input payload for the core orchestrator.
 *
 * @group Core
 */
export type CoreInput<
  TCatalogs extends UValueCatalogMap = UValueCatalogMap,
  THeatingType extends string = string,
> = Readonly<{
  roofWindow?: RoofWindowInput<TCatalogs>;
  wallWindow?: WallWindowInput<TCatalogs>;
  topFloorCeiling?: SurfaceInput<TCatalogs>;
  lowestFloor?: SurfaceInput<TCatalogs>;
  heating?: HeatingInput<THeatingType>;
  energy?: EnergyInput;
  aggregateReferenceAreaOverride?: number;
}>;

/**
 * Top-level runtime configuration for all domains.
 *
 * @group Core
 */
export type CoreConfig<
  TCatalogs extends UValueCatalogMap = UValueCatalogMap,
  THeatingConfig extends HeatingConfig = HeatingConfig,
  TEnergyConfig extends EnergyConfig = EnergyConfig,
> = Readonly<{
  envelope: EnvelopeConfig<TCatalogs>;
  heating: THeatingConfig;
  energy: TEnergyConfig;
}>;

/**
 * Top-level output payload of the core orchestrator.
 *
 * @group Core
 */
export type CoreResult = Readonly<{
  roofWindow?: RoofWindowResult;
  wallWindow?: WallWindowResult;
  topFloorCeiling?: SingleSurfaceResult;
  lowestFloor?: SingleSurfaceResult;
  heating?: HeatingResult;
  energy?: EnergyResult;
  aggregate: Readonly<{
    totalHt: number;
    totalReferenceArea: number;
    htPrime: number;
  }>;
}>;
