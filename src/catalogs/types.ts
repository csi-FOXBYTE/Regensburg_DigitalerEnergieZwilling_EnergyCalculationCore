/**
 * Year-bounded U-value entry.
 *
 * @group Catalogs
 */
export type YearBand = Readonly<{
  from?: number;
  to?: number;
  value: number;
}>;

/**
 * Year range definition without the value payload.
 *
 * @group Catalogs
 */
export type YearBandRange = Readonly<{
  from?: number;
  to?: number;
}>;

/**
 * Mapping of `construction -> year bands`.
 *
 * @group Catalogs
 */
export type UValueCatalog = Readonly<Record<string, readonly YearBand[]>>;

/**
 * Mapping of `catalog -> construction map`.
 *
 * @group Catalogs
 */
export type UValueCatalogMap = Readonly<Record<string, UValueCatalog>>;

/**
 * U-value input source (direct value or catalog lookup descriptor).
 *
 * @group Catalogs
 */
export type UValueSource =
  | Readonly<{ uValue: number }>
  | Readonly<{ catalog: string; construction: string; year: number }>;
