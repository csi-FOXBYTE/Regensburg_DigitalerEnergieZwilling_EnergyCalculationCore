import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityCost: number;
  }
}

export default {
  key: "electricityCost",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") * ctx.get("electricityUnitRate") +
    ctx.get("electricityBaseRate"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityCost"
>;
