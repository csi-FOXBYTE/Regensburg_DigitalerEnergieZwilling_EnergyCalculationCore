import type { BuildingType } from "../building-type";
import type { RangeKey } from "../range-bands";

export type DETGeneralInput = {
  buildingYear: number | RangeKey;
  numberOfStories?: number | null;
  buildingHeight: number;
  buildingBaseArea: number;
  livingArea?: number | null;
  type: BuildingType;
};
