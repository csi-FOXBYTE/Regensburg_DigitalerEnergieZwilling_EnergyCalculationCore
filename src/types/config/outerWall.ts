import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";
import type { Selection } from "../selection";

export type DETOuterWallConfig = {
  constructionTypes: Selection[];
  defaultConstructionType: YearBands<string>;
  uValue: KeyedValues<string, YearBands<number>>;
  thermalConductivity: number;
  assumedInsulationThickness: number;
  heatLossFactor: number;
};
