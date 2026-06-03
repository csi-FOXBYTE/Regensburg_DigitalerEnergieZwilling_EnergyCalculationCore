import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalEnergyDemand: number;
  }
}

export default {
  key: "totalEnergyDemand",
  resolve: (ctx) => {
    if (ctx.get("userThermalConsumption") != null) {
      return ctx.get("userTotalEnergyDemand") * ctx.get("renovationFactor");
    }
    return ctx.get("calculatedTotalEnergyDemand");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalEnergyDemand"
>;
