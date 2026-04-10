import type { RangeKey } from "../range-bands";

export type DETRoofWindowsInput = {
  area: number;
  year?: number | RangeKey | null;
  windowType?: string | null;
  uValue?: number | null;
};
