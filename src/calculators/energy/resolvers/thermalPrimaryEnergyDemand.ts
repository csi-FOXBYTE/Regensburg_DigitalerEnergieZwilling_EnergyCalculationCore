import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalPrimaryEnergyDemand: number;
  }
}

export default {
  key: "thermalPrimaryEnergyDemand",
  resolve: (ctx) =>
    ctx.get("thermalEnergyDemand") *
    ctx.get("primaryEnergyCarrierData").primaryEnergyFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalPrimaryEnergyDemand"
>;
