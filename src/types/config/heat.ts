import type { DETInput } from "../input";
import type { HeatFlowDirection } from "../heat-flow-direction";
import type { KeyedValues } from "../keyed-values";
import type { RangeBands, YearBands } from "../range-bands";
import type { Selection, SelectionFilter } from "../selection";

export type PrimaryEnergyCarrierData = {
  energyPerUnit: number;
  unitRate: number;
  baseRate: number;
  co2Factor: number;
  primaryEnergyFactor: number;
};

export type ElectricityTypeData = {
  co2Factor: number;
  unitRate: number;
  baseRate: number;
  primaryEnergyFactor: number;
};

export type CarrierRequirements = {
  storage?: boolean;
  gas?: boolean;
  bioGas?: boolean;
};

export type CarrierSelection = Selection & {
  requirements?: CarrierRequirements;
};

export function isCarrierCompatible(carrier: CarrierSelection, input: DETInput): boolean {
  const { requirements } = carrier;
  if (!requirements) return true;
  if (requirements.storage !== undefined && requirements.storage !== (input.heat.hasStorage ?? false)) return false;
  if (requirements.gas !== undefined && requirements.gas !== (input.heat.hasGasSupply ?? false)) return false;
  if (requirements.bioGas !== undefined && requirements.bioGas !== (input.heat.hasBioGas ?? false)) return false;
  return true;
}

export type DETHeatConfig = {
  primaryEnergyCarriers: CarrierSelection[];
  heatingSystemTypes: Selection[];
  heatingSurfaceTypes: Selection[];
  allowedHeatingSystemTypesByCarrier: SelectionFilter;
  electricityTypes: Selection[];
  defaultElectricityType: string;
  electricityTypeData: KeyedValues<string, ElectricityTypeData>;
  electricalRatio: KeyedValues<string, number>;

  hotWaterEnergyDemandFromAreaFactor: number;
  ventilationHeatLossCorrectionFactor: number;
  heatingDegreeDays: number;
  defaultPrimaryEnergyCarrier: string;
  defaultHeatingSystemType: KeyedValues<string, string>;
  defaultHeatingSurfaceType: string;
  heatingPerformanceFactor: KeyedValues<string, YearBands<RangeBands<number>>>;
  temperatureControlPerformanceFactor: KeyedValues<string, YearBands<KeyedValues<string, number>>>;
  primaryEnergyCarrierData: KeyedValues<string, PrimaryEnergyCarrierData>;
  innerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
  outerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
};
