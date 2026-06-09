import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatLossSum: number;
    preliminaryHeatingEnergyDemand: number;
    heatingEnergyDemand: number;
    hotWaterEnergyDemandFromAreaFactor: number;
    hotWaterEnergyDemand: number;
    calculatedTotalEnergyDemand: number;
    totalEnergyDemand: number;
  }
}

export const heatLossSum = {
  key: "heatLossSum",
  resolve: (ctx) =>
    ctx.get("ventilationHeatLoss") +
    ctx.get("roofHeatLoss") +
    ctx.get("topFloorHeatLoss") +
    ctx.get("roofWindowsHeatLoss") +
    ctx.get("exteriorWallWindowsHeatLoss") +
    ctx.get("outerWallHeatLoss") +
    ctx.get("bottomFloorHeatLoss"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatLossSum">;

export const preliminaryHeatingEnergyDemand = {
  key: "preliminaryHeatingEnergyDemand",
  resolve: (ctx) => ctx.get("heatLossSum") * ctx.get("heatingDegreeDays") * 0.024,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "preliminaryHeatingEnergyDemand">;

// NOTE: may be replaced with a more precise calculation method soon
export const heatingEnergyDemand = {
  key: "heatingEnergyDemand",
  resolve: (ctx) => ctx.get("preliminaryHeatingEnergyDemand"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatingEnergyDemand">;

export const hotWaterEnergyDemandFromAreaFactor = {
  key: "hotWaterEnergyDemandFromAreaFactor",
  resolve: (ctx) => ctx.input.config.heat.hotWaterEnergyDemandFromAreaFactor,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hotWaterEnergyDemandFromAreaFactor">;

export const hotWaterEnergyDemand = {
  key: "hotWaterEnergyDemand",
  resolve: (ctx) => ctx.get("netFloorArea") * ctx.get("hotWaterEnergyDemandFromAreaFactor"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hotWaterEnergyDemand">;

export const calculatedTotalEnergyDemand = {
  key: "calculatedTotalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("heatingEnergyDemand") * ctx.get("combinedHeatingPerformanceFactor") +
    ctx.get("hotWaterEnergyDemand"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "calculatedTotalEnergyDemand">;

export const totalEnergyDemand = {
  key: "totalEnergyDemand",
  resolve: (ctx) => {
    if (ctx.get("userThermalConsumption") != null) {
      return ctx.get("userTotalEnergyDemand") * ctx.get("renovationFactor");
    }
    return ctx.get("calculatedTotalEnergyDemand");
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "totalEnergyDemand">;

export default [
  heatLossSum,
  preliminaryHeatingEnergyDemand,
  heatingEnergyDemand,
  hotWaterEnergyDemandFromAreaFactor,
  hotWaterEnergyDemand,
  calculatedTotalEnergyDemand,
  totalEnergyDemand,
];
