import type { BuildingType } from "../building-type";
import type { DETInput } from "../input";
import type { HeatFlowDirection } from "../heat-flow-direction";
import type { KeyedValues } from "../keyed-values";
import type { RangeBands, YearBands } from "../range-bands";
import type { Selection, SelectionFilter } from "../selection";

export type PrimaryEnergyCarrierData = {
  energyPerUnit: number;
  unitRate: number;
  baseRate: number;
};

export type CarrierRequirements = {
  renewableElectricity?: boolean;
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
  if (requirements.renewableElectricity !== undefined && requirements.renewableElectricity !== (input.electricity.hasRenewableEnergy ?? false)) return false;
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

  hotWaterEnergyDemandFromAreaFactor: number;
  ventilationHeatLossCorrectionFactor: number;
  heatingDegreeDays: number;
  defaultPrimaryEnergyCarrier: string;
  defaultHeatingSystemType: KeyedValues<string, string>;
  defaultHeatingSurfaceType: string;
  heatingPerformanceFactor: KeyedValues<string, YearBands<RangeBands<number>>>;
  temperatureControlPerformanceFactor: KeyedValues<string, YearBands<KeyedValues<string, number>>>;
  primaryEnergyCarrierEfficiencyFactor: KeyedValues<string, number>;
  co2Factor: KeyedValues<string, number>;
  primaryEnergyCarrierData: KeyedValues<string, PrimaryEnergyCarrierData>;
  innerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
  outerSurfaceThermalResistance: KeyedValues<HeatFlowDirection, number>;
};
