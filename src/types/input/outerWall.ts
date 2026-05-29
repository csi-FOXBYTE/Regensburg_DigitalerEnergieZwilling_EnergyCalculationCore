import type { RangeKey } from "../range-bands";

export type DETOuterWallInput = {
  area: number;
  adjacentWallArea?: number | null;
  year?: number | RangeKey | null;
  hasInsulation?: boolean | null;
  constructionType?: string | null;
  insulationThickness?: number | null;
  uValue?: number | null;
};
