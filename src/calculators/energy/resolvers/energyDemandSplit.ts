import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalHeatingDemand: number;
    electricalHeatingDemand: number;
    calculatedElectricalEnergyDemand: number;
    thermalEnergyDemand: number;
    electricalEnergyDemand: number;
  }
}

export const thermalHeatingDemand = {
  key: "thermalHeatingDemand",
  resolve: (ctx) => ctx.get("heatingEnergyDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "thermalHeatingDemand">;

export const electricalHeatingDemand = {
  key: "electricalHeatingDemand",
  resolve: (ctx) => ctx.get("heatingEnergyDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalHeatingDemand">;

export const calculatedElectricalEnergyDemand = {
  key: "calculatedElectricalEnergyDemand",
  resolve: (ctx) => ctx.get("effectiveHeatingDemand") * ctx.get("electricalRatio"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "calculatedElectricalEnergyDemand">;

export const thermalEnergyDemand = {
  key: "thermalEnergyDemand",
  resolve: (ctx) => ctx.get("effectiveHeatingDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "thermalEnergyDemand">;

export const electricalEnergyDemand = {
  key: "electricalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("effectiveHeatingDemand") * ctx.get("electricalRatio") + ctx.get("electricityOffset"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalEnergyDemand">;

export default [
  thermalHeatingDemand,
  electricalHeatingDemand,
  calculatedElectricalEnergyDemand,
  thermalEnergyDemand,
  electricalEnergyDemand,
];
