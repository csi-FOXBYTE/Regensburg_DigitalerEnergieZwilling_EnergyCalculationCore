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
 * Catalog-name union derived from a concrete catalog map.
 *
 * @group Catalogs
 */
export type CatalogName<TCatalogs extends UValueCatalogMap> = Extract<keyof TCatalogs, string>;

/**
 * Construction-name union derived from a concrete catalog map and catalog name.
 *
 * @group Catalogs
 */
export type ConstructionName<
  TCatalogs extends UValueCatalogMap,
  TCatalog extends CatalogName<TCatalogs>,
> = [Extract<keyof TCatalogs[TCatalog], string>] extends [never]
  ? string
  : Extract<keyof TCatalogs[TCatalog], string>;

/**
 * Catalog/year lookup descriptor.
 *
 * @group Catalogs
 */
export type UValueLookupSource<TCatalogs extends UValueCatalogMap = UValueCatalogMap> =
  [CatalogName<TCatalogs>] extends [never]
    ? Readonly<{
        catalog: string;
        construction: string;
        year: number;
      }>
    : {
        [TCatalog in CatalogName<TCatalogs>]: Readonly<{
          catalog: TCatalog;
          construction: ConstructionName<TCatalogs, TCatalog>;
          year: number;
        }>;
      }[CatalogName<TCatalogs>];

/**
 * U-value input source (direct value or catalog lookup descriptor).
 *
 * @group Catalogs
 */
export type UValueSource<TCatalogs extends UValueCatalogMap = UValueCatalogMap> =
  | Readonly<{ uValue: number }>
  | UValueLookupSource<TCatalogs>;
