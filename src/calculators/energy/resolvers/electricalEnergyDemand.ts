import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricalEnergyDemand: number;
  }
}

export default {
  key: "electricalEnergyDemand",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") * ctx.get("electricalRatio") +
    ctx.get("electricityOffset"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricalEnergyDemand"
>;
