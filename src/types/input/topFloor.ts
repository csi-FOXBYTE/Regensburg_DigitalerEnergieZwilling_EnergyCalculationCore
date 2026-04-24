import type { RangeKey } from "../range-bands";

export type DETTopFloorInput = {
  area: number;
  year?: number | RangeKey | null;
  isAtticHeated?: boolean | null;
  topFloorType?: string | null;
  hasInsulation?: boolean | null;
  insulationThickness?: number | null;
  hasAttic?: boolean | null;
  uValue?: number | null;
};
