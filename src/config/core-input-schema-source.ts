import type { UValueCatalogMap } from "../catalogs/types";
import type { CoreInput } from "../core/types";

/**
 * Non-generic schema source type used for JSON Schema generation from the
 * public TypeScript input types.
 *
 * @group Configuration
 */
export type CoreInputSchemaSource = CoreInput<UValueCatalogMap, string>;
