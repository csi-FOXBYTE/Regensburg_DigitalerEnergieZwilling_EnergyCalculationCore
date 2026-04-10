export type RangeFirst = { to: number };
export type RangeMiddle = { from: number; to: number };
export type RangeLast = { from: number };

export type Ranges = [RangeFirst, ...RangeMiddle[], RangeLast] | [{}];

export type RangeBands<T> =
  | [
      RangeFirst & { value: T },
      ...(RangeMiddle & { value: T })[],
      RangeLast & { value: T },
    ]
  | [{ value: T }];

export type YearBands<T> = RangeBands<T>;

export type RangeKey = { from?: number; to?: number };

export function resolveRangeBand<T>(
  bands: RangeBands<T>,
  key: number | RangeKey,
): T | undefined {
  if (typeof key === "number") {
    const [fallback, ...rest] = bands;
    let result = fallback.value;
    for (const entry of rest) {
      if (entry.from > key) break;
      result = entry.value;
    }
    return result;
  }

  const rangeFrom = key.from ?? -Infinity;
  const rangeTo = key.to ?? Infinity;
  for (const band of bands) {
    const bandFrom =
      "from" in band ? (band as { from: number }).from : -Infinity;
    const bandTo = "to" in band ? (band as { to: number }).to : Infinity;
    if (bandFrom <= rangeFrom && bandTo >= rangeTo) return band.value;
  }
  return undefined;
}

export const resolveYearBand = resolveRangeBand;
