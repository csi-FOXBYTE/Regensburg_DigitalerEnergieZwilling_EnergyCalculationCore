export type { KeyedValues } from "./types/keyed-values.js";
export type {
  RangeBands,
  RangeFirst,
  RangeMiddle,
  RangeLast,
  Ranges,
  RangeKey,
  YearBands,
} from "./types/range-bands.js";
export { BuildingType } from "./types/building-type.js";
export { EnergyEfficiencyClass } from "./types/energy-efficiency-class.js";
export type { DETInput } from "./types/input/index.js";
export type { DETGeneralInput } from "./types/input/general.js";
export type { DETHeatInput } from "./types/input/heat.js";
export type { DETConfig } from "./types/config/index.js";
export type { DETGeneralConfig } from "./types/config/general.js";
export type { DETHeatConfig } from "./types/config/heat.js";

export { resolveKeyedValue } from "./types/keyed-values.js";
export { resolveRangeBand, resolveYearBand } from "./types/range-bands.js";
