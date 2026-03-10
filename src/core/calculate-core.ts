import type { UValueCatalogMap } from "../catalogs/types";
import { safeDivide } from "../shared/math";
import { calculateRoofWindow, calculateSingleSurface, calculateWallWindow } from "../envelope/calculators";
import { calculateEnergy } from "../energy/calculator";
import { calculateHeating } from "../heating/calculator";
import type { HeatingConfig, HeatingTypeFromConfigs } from "../heating/types";
import type { EnergyConfig } from "../energy/types";
import type { CoreConfig, CoreInput, CoreResult } from "./types";

/**
 * Executes the full energy-core calculation pipeline and returns
 * per-domain results plus aggregated KPIs.
 *
 * Processing order:
 * 1. Envelope domain blocks (`roofWindow`, `wallWindow`, `topFloorCeiling`, `lowestFloor`)
 * 2. Heating domain block (`heating`)
 * 3. Energy domain block (`energy`)
 * 4. Aggregation (`totalHt`, `totalReferenceArea`, `htPrime`)
 *
 * `aggregateReferenceAreaOverride`, when provided in the input, replaces
 * the computed sum of component reference areas for the final `htPrime`.
 *
 * @param input - External input values for all enabled domains.
 * @param config - Runtime configuration (catalogs, recommendation rules, thresholds).
 * @returns Structured domain results and aggregate metrics.
 * @group Core
 */
export function calculateCore<
  TCatalogs extends UValueCatalogMap,
  THeatingConfig extends HeatingConfig,
  TEnergyConfig extends EnergyConfig,
>(
  input: CoreInput<TCatalogs, HeatingTypeFromConfigs<THeatingConfig, TEnergyConfig>>,
  config: CoreConfig<TCatalogs, THeatingConfig, TEnergyConfig>,
): CoreResult {
  const roofWindow = input.roofWindow ? calculateRoofWindow(input.roofWindow, config.envelope) : undefined;
  const wallWindow = input.wallWindow ? calculateWallWindow(input.wallWindow, config.envelope) : undefined;
  const topFloorCeiling = input.topFloorCeiling
    ? calculateSingleSurface(
        input.topFloorCeiling,
        config.envelope.recommendations.topFloorCeiling,
        "topFloorCeiling",
        config.envelope,
      )
    : undefined;
  const lowestFloor = input.lowestFloor
    ? calculateSingleSurface(
        input.lowestFloor,
        config.envelope.recommendations.lowestFloor,
        "lowestFloor",
        config.envelope,
      )
    : undefined;
  const heating = input.heating ? calculateHeating(input.heating, config.heating) : undefined;

  const totalHt =
    (roofWindow?.totalHt ?? 0) +
    (wallWindow?.totalHt ?? 0) +
    (topFloorCeiling?.totalHt ?? 0) +
    (lowestFloor?.totalHt ?? 0);

  const totalReferenceArea =
    (roofWindow?.referenceArea ?? 0) +
    (wallWindow?.referenceArea ?? 0) +
    (topFloorCeiling?.referenceArea ?? 0) +
    (lowestFloor?.referenceArea ?? 0);
  const aggregateReferenceArea = input.aggregateReferenceAreaOverride ?? totalReferenceArea;
  const energy = input.energy
    ? calculateEnergy(
        input.energy,
        {
          totalHt,
          ...(input.heating ? { heating: input.heating } : {}),
        },
        config.energy,
      )
    : undefined;

  return {
    ...(roofWindow ? { roofWindow } : {}),
    ...(wallWindow ? { wallWindow } : {}),
    ...(topFloorCeiling ? { topFloorCeiling } : {}),
    ...(lowestFloor ? { lowestFloor } : {}),
    ...(heating ? { heating } : {}),
    ...(energy ? { energy } : {}),
    aggregate: {
      totalHt,
      totalReferenceArea: aggregateReferenceArea,
      htPrime: safeDivide(totalHt, aggregateReferenceArea),
    },
  };
}
