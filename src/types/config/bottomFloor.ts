import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";
import type { Selection, SelectionFilter } from "../selection";

export type DETBottomFloorConfig = {
  constructionTypes: Selection[];
  allowedConstructionTypesByHeatedCellar: SelectionFilter<boolean>;
  defaultConstructionType: KeyedValues<boolean, YearBands<string>>;
  uValue: KeyedValues<string, YearBands<number>>;
  thermalConductivity: number;
  assumedInsulationThickness: number;
  heatLossFactor: number;
};
