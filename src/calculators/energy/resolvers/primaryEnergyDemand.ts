import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyDemand: number;
  }
}

export default {
  key: "primaryEnergyDemand",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") * ctx.get("primaryEnergyCarrierEfficiencyFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyDemand"
>;
