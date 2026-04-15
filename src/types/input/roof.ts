import type { RangeKey } from "../range-bands";
import type { RoofInsulationType } from "../roof-insulation-type";

export type DETRoofInput = {
  area: number;
  year?: number | RangeKey | null;
  hasInsulation?: boolean | null;
  insulationType?: RoofInsulationType | null;
  constructionType?: string | null;
  insulationThickness?: number | null;
};
