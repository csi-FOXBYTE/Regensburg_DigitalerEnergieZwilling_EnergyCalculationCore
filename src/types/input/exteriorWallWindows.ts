import type { RangeKey } from "../range-bands";

export type DETExteriorWallWindowsInput = {
  area: number;
  year?: number | RangeKey | null;
  windowType?: string | null;
  uValue?: number | null;
};
