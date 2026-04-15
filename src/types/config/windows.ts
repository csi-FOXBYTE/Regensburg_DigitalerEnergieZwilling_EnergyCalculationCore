import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";
import type { Selection } from "../selection";

export type DETWindowsConfig = {
  windowTypes: Selection[];
  defaultWindowType: YearBands<string>;
  uValue: KeyedValues<string, YearBands<number>>;
  roofWindowsHeatLossFactor: number;
  exteriorWallWindowsHeatLossFactor: number;
};
