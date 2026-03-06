import { safeDivide } from "../shared/math";
import { calculateRoofWindow, calculateSingleSurface, calculateWallWindow } from "../envelope/calculators";
import { calculateHeating } from "../heating/calculator";
import type { CoreConfig, CoreInput, CoreResult } from "./types";

/**
 * Executes the full energy-core calculation pipeline and returns
 * per-domain results plus aggregated KPIs.
 *
 * Processing order:
 * 1. Envelope domain blocks (`roofWindow`, `wallWindow`, `ogd`, `ugd`)
 * 2. Heating domain block (`heating`)
 * 3. Aggregation (`totalHt`, `totalReferenceArea`, `htPrime`)
 *
 * `aggregateReferenceAreaOverride`, when provided in the input, replaces
 * the computed sum of component reference areas for the final `htPrime`.
 *
 * @param input - External input values for all enabled domains.
 * @param config - Runtime configuration (catalogs, recommendation rules, thresholds).
 * @returns Structured domain results and aggregate metrics.
 * @group Core
 */
export function calculateCore(input: CoreInput, config: CoreConfig): CoreResult {
  const roofWindow = input.roofWindow ? calculateRoofWindow(input.roofWindow, config.envelope) : undefined;
  const wallWindow = input.wallWindow ? calculateWallWindow(input.wallWindow, config.envelope) : undefined;
  const ogd = input.ogd
    ? calculateSingleSurface(input.ogd, config.envelope.recommendations.ogd, "ogd", config.envelope)
    : undefined;
  const ugd = input.ugd
    ? calculateSingleSurface(input.ugd, config.envelope.recommendations.ugd, "ugd", config.envelope)
    : undefined;
  const heating = input.heating ? calculateHeating(input.heating, config.heating) : undefined;

  const totalHt =
    (roofWindow?.totalHt ?? 0) +
    (wallWindow?.totalHt ?? 0) +
    (ogd?.totalHt ?? 0) +
    (ugd?.totalHt ?? 0);

  const totalReferenceArea =
    (roofWindow?.referenceArea ?? 0) +
    (wallWindow?.referenceArea ?? 0) +
    (ogd?.referenceArea ?? 0) +
    (ugd?.referenceArea ?? 0);
  const aggregateReferenceArea = input.aggregateReferenceAreaOverride ?? totalReferenceArea;

  return {
    ...(roofWindow ? { roofWindow } : {}),
    ...(wallWindow ? { wallWindow } : {}),
    ...(ogd ? { ogd } : {}),
    ...(ugd ? { ugd } : {}),
    ...(heating ? { heating } : {}),
    aggregate: {
      totalHt,
      totalReferenceArea: aggregateReferenceArea,
      htPrime: safeDivide(totalHt, aggregateReferenceArea),
    },
  };
}
