import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";

export type DETTopFloorConfig = {
  topFloorTypes: string[];
  defaultTopFloorType: YearBands<string>;
  thermalConductivity: number;
  assumedInsulationThickness: number;
  uValue: KeyedValues<string, YearBands<number>>;
  heatLossFactor: number;
};
