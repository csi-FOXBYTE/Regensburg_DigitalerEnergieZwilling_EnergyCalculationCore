import type { BuildingType } from "../building-type";
import type { KeyedValues } from "../keyed-values";
import type { RangeBands, YearBands } from "../range-bands";

export type PrimaryEnergyCarrierData = {
  energyPerUnit: number;
  unitRate: number;
  baseRate: number;
};

export type DETHeatConfig = {
  primaryEnergyCarriers: string[];
  heatEmitterTypes: string[];
  heatingSurfaceTypes: string[];

  hotWaterEnergyDemandFromAreaFactor: number;
  ventilationHeatLossCorrectionFactor: number;
  heatingDegreeDays: number;
  defaultPrimaryEnergyCarrier: string;
  defaultHeatEmitterType: string;
  defaultHeatingSurfaceType: string;
  heatCircuitTemperature: KeyedValues<string, YearBands<number>>;
  heatingPerformanceFactor: KeyedValues<string, YearBands<RangeBands<number>>>;
  temperatureControlPerformanceFactor: KeyedValues<string, YearBands<KeyedValues<string, number>>>;
  primaryEnergyCarrierEfficiencyFactor: KeyedValues<string, number>;
  co2Factor: KeyedValues<string, number>;
  primaryEnergyCarrierData: KeyedValues<string, PrimaryEnergyCarrierData>;
};
