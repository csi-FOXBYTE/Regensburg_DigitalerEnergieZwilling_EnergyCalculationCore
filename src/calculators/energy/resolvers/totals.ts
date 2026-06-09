import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { EnergyEfficiencyClass } from "../../../types/energy-efficiency-class.js";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    totalEnergyConsumption: number;
    totalEnergyDemandPerSquareMeter: number;
    primaryEnergyDemand: number;
    primaryEnergyDemandPerSquareMeter: number;
    totalCost: number;
    totalCo2Emissions: number;
    energyEfficiencyClass: EnergyEfficiencyClass;
  }
}

export const totalEnergyConsumption = {
  key: "totalEnergyConsumption",
  resolve: (ctx) => ctx.get("thermalEnergyDemand") + ctx.get("electricalEnergyDemand"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "totalEnergyConsumption">;

export const totalEnergyDemandPerSquareMeter = {
  key: "totalEnergyDemandPerSquareMeter",
  resolve: (ctx) => ctx.get("totalEnergyConsumption") / ctx.get("usableFloorArea"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "totalEnergyDemandPerSquareMeter">;

export const primaryEnergyDemand = {
  key: "primaryEnergyDemand",
  resolve: (ctx) =>
    ctx.get("thermalPrimaryEnergyDemand") + ctx.get("electricalPrimaryEnergyDemand"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "primaryEnergyDemand">;

export const primaryEnergyDemandPerSquareMeter = {
  key: "primaryEnergyDemandPerSquareMeter",
  resolve: (ctx) => ctx.get("primaryEnergyDemand") / ctx.get("usableFloorArea"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "primaryEnergyDemandPerSquareMeter">;

export const totalCost = {
  key: "totalCost",
  resolve: (ctx) => ctx.get("thermalCarrierCost") + ctx.get("electricityCost"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "totalCost">;

export const totalCo2Emissions = {
  key: "totalCo2Emissions",
  resolve: (ctx) => ctx.get("thermalCo2Emissions") + ctx.get("electricityCo2Emissions"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "totalCo2Emissions">;

export const energyEfficiencyClass = {
  key: "energyEfficiencyClass",
  resolve: (ctx) => {
    const result = resolveRangeBand(
      ctx.input.config.general.energyEfficiencyClasses,
      ctx.get("totalEnergyDemandPerSquareMeter"),
    );
    if (result == null) throw new Error("Failed to resolve energyEfficiencyClass");
    return result;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "energyEfficiencyClass">;

export default [
  totalEnergyConsumption,
  totalEnergyDemandPerSquareMeter,
  primaryEnergyDemand,
  primaryEnergyDemandPerSquareMeter,
  totalCost,
  totalCo2Emissions,
  energyEfficiencyClass,
];
