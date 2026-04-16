import type { RangeKey } from "../range-bands";

export type DETHeatInput = {
  heatingSystemConstructionYear?: number | RangeKey | null;
  primaryEnergyCarrier?: string | null;
  heatingSystemType?: string | null;
  heatingSurfaceType?: string | null;
};
