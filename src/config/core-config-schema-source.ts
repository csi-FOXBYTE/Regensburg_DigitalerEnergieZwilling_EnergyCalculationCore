import type { CoreConfigJson, JsonCatalogConfigMap } from "./core-config-json";
import type { EnergyConfig } from "../energy/types";
import type { HeatingConfig } from "../heating/types";

/**
 * Non-generic schema source type used for JSON Schema generation from the
 * public TypeScript configuration types.
 *
 * @group Configuration
 */
export type CoreConfigJsonSchemaSource = CoreConfigJson<JsonCatalogConfigMap, HeatingConfig, EnergyConfig>;
