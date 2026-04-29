import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    renovationFactor: number;
  }
}

export default {
  key: "renovationFactor",
  resolve: (ctx) => {
    const preRenovationTotal = ctx.input.input.heat.preRenovationTotalEnergyDemand;
    if (preRenovationTotal == null || preRenovationTotal === 0) return 1;
    return ctx.get("calculatedTotalEnergyDemand") / preRenovationTotal;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "renovationFactor"
>;
