import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalSpaceHeatingDemand: number;
    electricalSpaceHeatingDemand: number;
    electricalDemandWithoutOffset: number;
    thermalEnergyDemand: number;
    electricalEnergyDemand: number;
  }
}

export const thermalSpaceHeatingDemand = {
  key: "thermalSpaceHeatingDemand",
  resolve: (ctx) => ctx.get("spaceHeatingDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "thermalSpaceHeatingDemand">;

export const electricalSpaceHeatingDemand = {
  key: "electricalSpaceHeatingDemand",
  resolve: (ctx) => ctx.get("spaceHeatingDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalSpaceHeatingDemand">;

export const electricalDemandWithoutOffset = {
  key: "electricalDemandWithoutOffset",
  resolve: (ctx) => ctx.get("netThermalDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalDemandWithoutOffset">;

export const thermalEnergyDemand = {
  key: "thermalEnergyDemand",
  resolve: (ctx) => ctx.get("netThermalDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "thermalEnergyDemand">;

export const electricalEnergyDemand = {
  key: "electricalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("netThermalDemand") * ctx.get("electricalRatio") + ctx.get("baseElectricalLoad"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalEnergyDemand">;

export default [
  thermalSpaceHeatingDemand,
  electricalSpaceHeatingDemand,
  electricalDemandWithoutOffset,
  thermalEnergyDemand,
  electricalEnergyDemand,
];
