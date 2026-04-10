import type { BuildingType } from "../building-type";
import type { KeyedValues } from "../keyed-values";
import type { EnergyEfficiencyClass } from "../energy-efficiency-class";
import type { RangeBands, Ranges } from "../range-bands";

export type DETGeneralConfig = {
  generalYearBands: Ranges;
  energyEfficiencyClasses: RangeBands<EnergyEfficiencyClass>;

  assumedFloorSlabThickness: number;
  assumedInteriorStoryHeight: number;

  heatedAirVolumeCorrectionFactor: RangeBands<number>;
  usableFloorAreaFactor: number;

  netFloorAreaFromUsableFloorAreaFactor: KeyedValues<
    BuildingType,
    KeyedValues<boolean, number>
  >;
  netFloorAreaFromLivingAreaFactor: number;
};
