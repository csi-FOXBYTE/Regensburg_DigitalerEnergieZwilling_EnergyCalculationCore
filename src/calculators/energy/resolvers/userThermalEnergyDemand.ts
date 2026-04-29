import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    userThermalEnergyDemand: number;
  }
}

export default {
  key: "userThermalEnergyDemand",
  resolve: (ctx) =>
    (ctx.input.input.heat.userThermalConsumption ?? 0) *
    ctx.get("preRenovationCarrierData").energyPerUnit,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "userThermalEnergyDemand"
>;
