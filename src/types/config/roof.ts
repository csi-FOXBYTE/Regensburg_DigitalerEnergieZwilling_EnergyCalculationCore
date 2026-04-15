import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";
import type { RoofInsulationType } from "../roof-insulation-type";
import type { Selection } from "../selection";

export type DETRoofConfig = {
  heatLossFactor: number;
  defaultInsulationType: RoofInsulationType;
  constructionTypes: Selection[];
  defaultConstructionType: string;
  assumedInsulationThickness: number;
  thermalConductivity: number;
  insulationReductionFactor: number;
  uValue: KeyedValues<string, YearBands<number>>;
};
