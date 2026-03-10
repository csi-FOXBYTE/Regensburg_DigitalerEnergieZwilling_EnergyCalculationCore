import type { UValueCatalogMap, UValueSource, YearBand, YearBandRange } from "./types";

/**
 * Resolves a U-value either directly from input or via catalog/year lookup.
 *
 * @param source - Direct U-value source or catalog-based lookup source.
 * @param catalogs - Configured U-value catalogs.
 * @returns Resolved U-value.
 * @throws If catalog/construction is missing or no year band matches.
 * @group Catalogs
 */
export function resolveUValue<TCatalogs extends UValueCatalogMap>(source: UValueSource<TCatalogs>, catalogs: TCatalogs): number {
  if ("uValue" in source) {
    return source.uValue;
  }

  const catalog = catalogs[source.catalog];
  if (!catalog) {
    throw new Error(`Missing catalog '${source.catalog}'.`);
  }

  const bands = catalog[source.construction];
  if (!bands || bands.length === 0) {
    throw new Error(`Missing construction '${source.construction}' in catalog '${source.catalog}'.`);
  }

  for (const band of bands) {
    const lowerOk = band.from === undefined || source.year >= band.from;
    const upperOk = band.to === undefined || source.year <= band.to;
    if (lowerOk && upperOk) {
      return band.value;
    }
  }

  throw new Error(
    `No year band in catalog '${source.catalog}' for construction '${source.construction}' and year ${source.year}.`,
  );
}

/**
 * Converts a numeric U-value list into explicit year bands by using
 * the provided range layout.
 *
 * The number of values must match the number of layout entries.
 *
 * @param values - U-values in band order.
 * @param layout - Year ranges in the same order as `values`.
 * @returns Explicit year-band list with attached values.
 * @throws If input is empty or values/layout lengths do not match.
 * @group Catalogs
 */
export function yearBandsFromLayout(
  values: readonly number[],
  layout: readonly YearBandRange[],
): readonly YearBand[] {
  if (values.length === 0) {
    throw new Error("Expected at least one U-value.");
  }

  if (values.length !== layout.length) {
    throw new Error(
      `Values/layout length mismatch: got ${values.length} values and ${layout.length} layout entries.`,
    );
  }

  const bands: YearBand[] = [];
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    const range = layout[i];
    if (value === undefined || range === undefined) {
      throw new Error("Incomplete values/layout data.");
    }
    bands.push({
      ...(range.from !== undefined ? { from: range.from } : {}),
      ...(range.to !== undefined ? { to: range.to } : {}),
      value,
    });
  }

  return bands;
}
