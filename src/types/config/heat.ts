import type { BuildingType } from "../building-type";
import type { HeatFlowDirection } from "../heat-flow-direction";
import type { KeyedValues } from "../keyed-values";
import type { RangeBands, YearBands } from "../range-bands";
import type { Selection, SelectionFilter } from "../selection";

export type PrimaryEnergyCarrierData = {
  energyPerUnit: number;
  unitRate: number;
  baseRate: number;
};

export type DETHeatConfig = {
  primaryEnergyCarriers: Selection[];
  heatingSystemTypes: Selection[];
  heatingSurfaceTypes: Selection[];
  allowedHeatingSystemTypesByCarrier: SelectionFilter;

  hotWaterEnergyDemandFromAreaFactor: number;
  ventilationHeatLossCorrectionFactor: number;
  heatingDegreeDays: number;
  defaultPrimaryEnergyCarrier: string;
  defaultHeatingSystemType: string;
  defaultHeatingSurfaceType: string;
  heatingPerformanceFactor: KeyedValues<string, YearBands<RangeBands<number>>>;
  temperatureControlPerformanceFactor: KeyedValues<string, YearBands<KeyedValues<string, number>>>;
  primaryEnergyCarrierEfficiencyFactor: KeyedValues<string, number>;
  co2Factor: KeyedValues<string, number>;
  primaryEnergyCarrierData: KeyedValues<string, PrimaryEnergyCarrierData>;
  innerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
  outerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
};
