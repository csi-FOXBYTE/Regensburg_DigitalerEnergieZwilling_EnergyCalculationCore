import type { RangeKey } from "../range-bands";

export type DETHeatInput = {
  heatingSystemConstructionYear?: number | RangeKey | null;
  primaryEnergyCarrier?: string | null;
  heatingSystemType?: string | null;
  heatingSurfaceType?: string | null;
  hasGasSupply?: boolean | null;
  hasBioGas?: boolean | null;
  hasStorage?: boolean | null;
  userThermalUnitRate?: number | null;
  userThermalConsumption?: number | null;
  preRenovationTotalEnergyDemand?: number | null;
  preRenovationPrimaryEnergyCarrier?: string | null;
  preRenovationHeatingSystemType?: string | null;
};
