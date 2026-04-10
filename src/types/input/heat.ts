import type { RangeKey } from "../range-bands";

export type DETHeatInput = {
  isBasementHeated: boolean;
  heatingSystemConstructionYear?: number | RangeKey | null;
  primaryEnergyCarrier?: string | null;
  heatEmitterType?: string | null;
  heatingSurfaceType?: string | null;
};
