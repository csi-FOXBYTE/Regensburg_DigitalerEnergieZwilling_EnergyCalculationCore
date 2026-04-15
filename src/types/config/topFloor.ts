import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";
import type { Selection } from "../selection";

export type DETTopFloorConfig = {
  topFloorTypes: Selection[];
  defaultTopFloorType: YearBands<string>;
  thermalConductivity: number;
  assumedInsulationThickness: number;
  uValue: KeyedValues<string, YearBands<number>>;
  heatLossFactor: number;
};
