import type { DETConfig } from "./types/config/index.js";
import type { DETInput } from "./types/input/index.js";
import type { PreRenovationValues } from "./types/input/preRenovation.js";
import type { EnergyEfficiencyClass } from "./types/energy-efficiency-class.js";
import { DETEnergyCaluclator } from "./calculators/energy/index.js";

export type CalculationResult = {
  energyConsumptionPerSquareMeter: number;
  energyEfficiencyClass: EnergyEfficiencyClass;
  yearlyCost: number;
  co2Emissions: number;
  hadInternalGains: boolean;
  preRenovationValues: PreRenovationValues;
  resolvedInput: DETInput;
};

export type CalculateOptions = {
  debug?: boolean;
};

export function calculate(
  config: DETConfig,
  input: DETInput,
  options?: CalculateOptions,
): CalculationResult {
  const ctx = DETEnergyCaluclator({ config, input });

  const result: CalculationResult = {
    energyConsumptionPerSquareMeter: ctx.get("totalEnergyDemandPerSquareMeter"),
    energyEfficiencyClass: ctx.get("energyEfficiencyClass"),
    yearlyCost: ctx.get("totalCost"),
    co2Emissions: ctx.get("totalCo2Emissions"),
    hadInternalGains: ctx.get("hasInternalGains"),
    preRenovationValues: input.preRenovationValues ?? {
      totalEnergyDemand: ctx.get("calculatedTotalEnergyDemand"),
      primaryEnergyCarrier: ctx.get("primaryEnergyCarrier"),
      heatingSystemType: ctx.get("heatingSystemType"),
      electricityOffset: ctx.get("electricityOffset"),
      hadInternalGains: ctx.get("hasInternalGains"),
    },
    resolvedInput: {
      general: {
        buildingYear: ctx.get("buildingYear"),
        numberOfStories: ctx.get("numberOfStories"),
        buildingHeight: ctx.get("buildingHeight"),
        buildingBaseArea: ctx.get("buildingBaseArea"),
        livingArea: ctx.get("livingArea"),
        type: ctx.get("buildingType"),
      },
      heat: {
        heatingSystemConstructionYear: ctx.get("heatingSystemConstructionYear"),
        primaryEnergyCarrier: ctx.get("primaryEnergyCarrier"),
        heatingSystemType: ctx.get("heatingSystemType"),
        heatingSurfaceType: ctx.get("heatingSurfaceType"),
        hasGasSupply: ctx.get("hasGasSupply"),
        hasBioGas: ctx.get("hasBioGas"),
        hasStorage: ctx.get("hasStorage"),
      },
      electricity: {
        electricityType: ctx.get("electricityType"),
      },
      roof: {
        area: ctx.get("roofArea"),
        year: ctx.get("roofYear"),
        hasInsulation: ctx.get("roofHasInsulation"),
        insulationType: ctx.get("roofInsulationType"),
        constructionType: ctx.get("roofConstructionType"),
        insulationThickness: ctx.get("roofInsulationThickness"),
      },
      roofWindows: {
        area: ctx.get("roofWindowsArea"),
        year: ctx.get("roofWindowsYear"),
        windowType: ctx.get("roofWindowsType"),
        uValue: ctx.get("roofWindowsUValue"),
      },
      exteriorWallWindows: {
        area: ctx.get("exteriorWallWindowsArea"),
        year: ctx.get("exteriorWallWindowsYear"),
        windowType: ctx.get("exteriorWallWindowsType"),
        uValue: ctx.get("exteriorWallWindowsUValue"),
      },
      topFloor: {
        area: ctx.get("topFloorArea"),
        year: ctx.get("topFloorYear"),
        isAtticHeated: ctx.get("isAtticHeated"),
        topFloorType: ctx.get("topFloorType"),
        hasInsulation: ctx.get("topFloorHasInsulation"),
        insulationThickness: ctx.get("topFloorInsulationThickness"),
        hasAttic: ctx.get("hasAttic"),
      },
      outerWall: {
        area: ctx.get("outerWallArea"),
        year: ctx.get("outerWallYear"),
        hasInsulation: ctx.get("outerWallHasInsulation"),
        constructionType: ctx.get("outerWallConstructionType"),
        insulationThickness: ctx.get("outerWallInsulationThickness"),
      },
      bottomFloor: {
        area: ctx.get("bottomFloorArea"),
        year: ctx.get("bottomFloorYear"),
        isHeated: ctx.get("bottomFloorIsHeated"),
        hasInsulation: ctx.get("bottomFloorHasInsulation"),
        constructionType: ctx.get("bottomFloorConstructionType"),
        insulationThickness: ctx.get("bottomFloorInsulationThickness"),
        hasBasement: ctx.get("hasBasement"),
        isBasementHeated: ctx.get("isBasementHeated"),
      },
    },
  };

  if (options?.debug) {
    console.log("[DET] Resolved values:", ctx.getAll());
  }

  return result;
}
