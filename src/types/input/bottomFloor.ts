import type { RangeKey } from "../range-bands";

export type DETBottomFloorInput = {
  area: number;
  year?: number | RangeKey | null;
  isHeated?: boolean | null;
  hasInsulation?: boolean | null;
  constructionType?: string | null;
  insulationThickness?: number | null;
  hasBasement?: boolean | null;
  isBasementHeated?: boolean | null;
};
