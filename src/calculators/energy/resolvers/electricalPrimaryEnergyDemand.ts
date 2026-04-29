import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricalPrimaryEnergyDemand: number;
  }
}

export default {
  key: "electricalPrimaryEnergyDemand",
  resolve: (ctx) =>
    ctx.get("electricalEnergyDemand") *
    ctx.get("electricityTypeData").primaryEnergyFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricalPrimaryEnergyDemand"
>;
