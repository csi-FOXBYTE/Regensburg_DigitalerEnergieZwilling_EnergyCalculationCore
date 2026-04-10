import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalEnergyDemand: number;
  }
}

export default {
  key: "totalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("heatingEnergyDemand") *
      ctx.get("combinedHeatingPerformanceFactor") +
    ctx.get("hotWaterEnergyDemand"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalEnergyDemand"
>;
