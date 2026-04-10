import type { RangeKey } from "../range-bands";

export type DETRoofInput = {
  area: number;
  year?: number | RangeKey | null;
  insulationType?: string | null;
  constructionType?: string | null;
  insulationThickness?: number | null;
};
