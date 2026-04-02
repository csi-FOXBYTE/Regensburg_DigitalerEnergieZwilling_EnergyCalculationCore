import type { BuildingType } from "../building-type";

export type DETGeneralInput = {
  numberOfStories?: number | null;
  buildingHeight: number;
  buildingBaseArea: number;
  livingArea?: number | null;

  type: BuildingType;
};
