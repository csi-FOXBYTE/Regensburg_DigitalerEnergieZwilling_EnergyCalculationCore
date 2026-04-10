import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    energyCarrierCost: number;
  }
}

export default {
  key: "energyCarrierCost",
  resolve: (ctx) => {
    const data = ctx.get("primaryEnergyCarrierData");
    return ctx.get("energyCarrierConsumption") * data.unitRate + data.baseRate;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "energyCarrierCost"
>;
