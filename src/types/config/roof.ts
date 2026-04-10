import type { KeyedValues } from "../keyed-values";
import type { YearBands } from "../range-bands";

export type DETRoofConfig = {
  heatLossFactor: number;
  insulationTypes: string[];
  defaultInsulationType: string;
  constructionTypes: string[];
  defaultConstructionType: string;
  assumedInsulationThickness: number;
  thermalConductivity: number;
  insulationReductionFactor: KeyedValues<string, number>;
  uValue: KeyedValues<string, YearBands<number>>;
};
