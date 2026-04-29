import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyCarrierEfficiencyFactor: number;
  }
}

export default {
  key: "primaryEnergyCarrierEfficiencyFactor",
  resolve: (ctx) => ctx.get("primaryEnergyCarrierData").primaryEnergyFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyCarrierEfficiencyFactor"
>;
