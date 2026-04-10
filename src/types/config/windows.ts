import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";

export type DETWindowsConfig = {
  windowTypes: string[];
  defaultWindowType: YearBands<string>;
  uValue: KeyedValues<string, YearBands<number>>;
  roofWindowsHeatLossFactor: number;
  exteriorWallWindowsHeatLossFactor: number;
};
