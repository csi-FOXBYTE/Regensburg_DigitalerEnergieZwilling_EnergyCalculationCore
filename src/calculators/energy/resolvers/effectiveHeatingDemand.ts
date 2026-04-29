import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    effectiveHeatingDemand: number;
  }
}

export default {
  key: "effectiveHeatingDemand",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") * ctx.get("internalGainsFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "effectiveHeatingDemand"
>;
