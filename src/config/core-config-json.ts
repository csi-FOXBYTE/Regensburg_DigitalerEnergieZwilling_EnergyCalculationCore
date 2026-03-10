import type { YearBand } from "../catalogs/types";
import type { CoreConfig } from "../core/types";
import type { EnergyConfig } from "../energy/types";
import type { EnvelopeComponentDefaults, EnvelopeRecommendationConfig } from "../envelope/types";
import type { HeatingConfig } from "../heating/types";

/**
 * JSON representation for one construction entry in a catalog.
 *
 * @group Configuration
 */
export type JsonConstructionConfig = readonly YearBand[];

/**
 * Mapping of `construction -> raw JSON construction config`.
 *
 * @group Configuration
 */
export type JsonCatalogConfig = Readonly<Record<string, JsonConstructionConfig>>;

/**
 * Mapping of `catalog -> raw JSON catalog config`.
 *
 * @group Configuration
 */
export type JsonCatalogConfigMap = Readonly<Record<string, JsonCatalogConfig>>;

/**
 * Runtime catalog map derived from a JSON catalog config map.
 *
 * @group Configuration
 */
export type NormalizedCatalogMap<TCatalogs extends JsonCatalogConfigMap> = Readonly<{
  [TCatalog in keyof TCatalogs]: Readonly<{
    [TConstruction in keyof TCatalogs[TCatalog]]: readonly YearBand[];
  }>;
}>;

/**
 * JSON input schema for external core configuration.
 *
 * @group Configuration
 */
export type CoreConfigJson<
  TCatalogs extends JsonCatalogConfigMap = JsonCatalogConfigMap,
  THeatingConfig extends HeatingConfig = HeatingConfig,
  TEnergyConfig extends EnergyConfig = EnergyConfig,
> = Readonly<{
  envelope: Readonly<{
    defaultFactor: number;
    defaultDeltaUwb: number;
    componentDefaults?: EnvelopeComponentDefaults;
    catalogs: TCatalogs;
    recommendations: EnvelopeRecommendationConfig;
  }>;
  heating: THeatingConfig;
  energy: TEnergyConfig;
}>;

/**
 * Converts an external JSON configuration object into the internal runtime config.
 *
 * @param input - External JSON configuration object.
 * @returns Internal normalized core configuration.
 * @group Configuration
 */
export function coreConfigFromJson<
  const TCatalogs extends JsonCatalogConfigMap,
  const THeatingConfig extends HeatingConfig,
  const TEnergyConfig extends EnergyConfig,
>(
  input: CoreConfigJson<TCatalogs, THeatingConfig, TEnergyConfig>,
): CoreConfig<NormalizedCatalogMap<TCatalogs>, THeatingConfig, TEnergyConfig> {
  const catalogs = {} as {
    -readonly [TCatalog in keyof TCatalogs]: {
      -readonly [TConstruction in keyof TCatalogs[TCatalog]]: readonly YearBand[];
    };
  };

  for (const [catalogName, constructions] of Object.entries(input.envelope.catalogs)) {
    const normalizedConstructions = {} as {
      -readonly [TConstruction in keyof TCatalogs[Extract<keyof TCatalogs, typeof catalogName>]]: readonly YearBand[];
    };
    for (const [constructionName, config] of Object.entries(constructions)) {
      normalizedConstructions[constructionName as keyof typeof normalizedConstructions] = normalizeConstructionConfig(config);
    }
    catalogs[catalogName as keyof typeof catalogs] = normalizedConstructions;
  }

  return {
    envelope: {
      defaultFactor: input.envelope.defaultFactor,
      defaultDeltaUwb: input.envelope.defaultDeltaUwb,
      catalogs,
      recommendations: input.envelope.recommendations,
      ...(input.envelope.componentDefaults ? { componentDefaults: input.envelope.componentDefaults } : {}),
    },
    heating: input.heating,
    energy: input.energy,
  };
}

/**
 * Normalizes a single construction config entry into explicit year bands.
 *
 * @param input - Explicit year bands.
 * @returns Explicit year-band list.
 * @throws If input is empty.
 */
function normalizeConstructionConfig(input: JsonConstructionConfig): readonly YearBand[] {
  if (input.length === 0) {
    throw new Error("Construction config must not be empty.");
  }

  return input;
}
