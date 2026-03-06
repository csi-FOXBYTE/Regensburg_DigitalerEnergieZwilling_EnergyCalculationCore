import { yearBandsFromLayout } from "../catalogs/u-value";
import type { YearBand, YearBandRange } from "../catalogs/types";
import type { CoreConfig } from "../core/types";
import type { EnvelopeRecommendationConfig } from "../envelope/types";
import type { HeatingConfig } from "../heating/types";

/**
 * JSON representation for one construction entry in a catalog.
 *
 * Numeric arrays are interpreted via `envelope.yearBandLayout`.
 * Explicit year-band arrays can be passed directly.
 *
 * @group Configuration
 */
export type JsonConstructionConfig = readonly number[] | readonly YearBand[];

/**
 * JSON input schema for external core configuration.
 *
 * @group Configuration
 */
export type CoreConfigJson = Readonly<{
  envelope: Readonly<{
    defaultFactor: number;
    defaultDeltaUwb: number;
    yearBandLayout?: readonly YearBandRange[];
    catalogs: Readonly<Record<string, Readonly<Record<string, JsonConstructionConfig>>>>;
    recommendations: EnvelopeRecommendationConfig;
  }>;
  heating: HeatingConfig;
}>;

/**
 * Converts an external JSON configuration object into the internal runtime config.
 *
 * Numeric construction arrays are expanded using `envelope.yearBandLayout`.
 * Explicit `{ from?, to?, value }` arrays are forwarded as-is.
 *
 * @param input - External JSON configuration object.
 * @returns Internal normalized core configuration.
 * @group Configuration
 */
export function coreConfigFromJson(input: CoreConfigJson): CoreConfig {
  const catalogs: Record<string, Record<string, readonly YearBand[]>> = {};

  for (const [catalogName, constructions] of Object.entries(input.envelope.catalogs)) {
    const normalizedConstructions: Record<string, readonly YearBand[]> = {};
    for (const [constructionName, config] of Object.entries(constructions)) {
      normalizedConstructions[constructionName] = normalizeConstructionConfig(
        config,
        input.envelope.yearBandLayout,
      );
    }
    catalogs[catalogName] = normalizedConstructions;
  }

  return {
    envelope: {
      defaultFactor: input.envelope.defaultFactor,
      defaultDeltaUwb: input.envelope.defaultDeltaUwb,
      catalogs,
      recommendations: input.envelope.recommendations,
    },
    heating: input.heating,
  };
}

/**
 * Normalizes a single construction config entry into explicit year bands.
 *
 * @param input - Either numeric values or explicit year bands.
 * @param layout - Optional year-band layout used for numeric arrays.
 * @returns Explicit year-band list.
 * @throws If input is empty or numeric input is provided without layout.
 */
function normalizeConstructionConfig(
  input: JsonConstructionConfig,
  layout?: readonly YearBandRange[],
): readonly YearBand[] {
  if (input.length === 0) {
    throw new Error("Construction config must not be empty.");
  }

  const [first] = input;
  if (typeof first === "number") {
    if (!layout) {
      throw new Error("Missing 'yearBandLayout' for numeric array construction config.");
    }
    return yearBandsFromLayout(input as readonly number[], layout);
  }

  if (typeof first === "object" && first !== null) {
    return input as readonly YearBand[];
  }

  throw new Error("Invalid construction config format.");
}
