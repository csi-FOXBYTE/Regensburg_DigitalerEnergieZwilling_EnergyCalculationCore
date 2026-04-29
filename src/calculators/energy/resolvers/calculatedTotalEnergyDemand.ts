import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    calculatedTotalEnergyDemand: number;
  }
}

export default {
  key: "calculatedTotalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("heatingEnergyDemand") *
      ctx.get("combinedHeatingPerformanceFactor") +
    ctx.get("hotWaterEnergyDemand"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "calculatedTotalEnergyDemand"
>;
