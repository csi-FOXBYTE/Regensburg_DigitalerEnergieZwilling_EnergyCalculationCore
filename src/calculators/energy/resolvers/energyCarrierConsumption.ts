import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalCarrierConsumption: number;
  }
}

export default {
  key: "thermalCarrierConsumption",
  resolve: (ctx) =>
    ctx.get("thermalEnergyDemand") /
    ctx.get("primaryEnergyCarrierData").energyPerUnit,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalCarrierConsumption"
>;
