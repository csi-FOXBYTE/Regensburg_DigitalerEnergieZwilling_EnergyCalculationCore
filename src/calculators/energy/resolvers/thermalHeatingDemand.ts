import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalHeatingDemand: number;
  }
}

export default {
  key: "thermalHeatingDemand",
  resolve: (ctx) =>
    ctx.get("heatingEnergyDemand") * (1 - ctx.get("electricalRatio")),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalHeatingDemand"
>;
