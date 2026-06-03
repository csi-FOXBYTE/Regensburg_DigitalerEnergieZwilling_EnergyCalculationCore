import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalBaseRate: number;
  }
}

export default {
  key: "thermalBaseRate",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.userThermalBaseRate;
    if (override != null) {
      const bundlePresent = ctx.input.input.preRenovationValues != null;
      if (!bundlePresent) return override;
      const preRenovCarrier = ctx.input.input.preRenovationValues?.primaryEnergyCarrier;
      if (preRenovCarrier == null || preRenovCarrier === ctx.get("primaryEnergyCarrier")) {
        return override;
      }
    }
    return ctx.get("primaryEnergyCarrierData").baseRate;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "thermalBaseRate">;
