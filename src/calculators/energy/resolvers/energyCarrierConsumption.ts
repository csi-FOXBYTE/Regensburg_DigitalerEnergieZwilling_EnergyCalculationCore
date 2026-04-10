import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    energyCarrierConsumption: number;
  }
}

export default {
  key: "energyCarrierConsumption",
  resolve: (ctx) =>
    ctx.get("totalEnergyDemand") /
    ctx.get("primaryEnergyCarrierData").energyPerUnit,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "energyCarrierConsumption"
>;
