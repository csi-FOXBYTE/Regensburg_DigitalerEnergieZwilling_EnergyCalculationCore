import type { BuildingType } from "../building-type";
import type { KeyedValues } from "../keyed-values";
import type { Ranges } from "../range-bands";

export type DETGeneralConfig = {
  generalYearBands: Ranges;

  assumedFloorSlabThickness: number;
  assumedInteriorStoryHeight: number;

  heatedAirVolumeCorrectionFactor: number;
  usableFloorAreaFactor: number;

  netFloorAreaFromUsableFloorAreaFactor: KeyedValues<
    BuildingType,
    KeyedValues<boolean, number>
  >;
  netFloorAreaFromLivingAreaFactor: number;
};
