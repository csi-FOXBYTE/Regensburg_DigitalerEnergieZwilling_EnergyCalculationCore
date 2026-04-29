import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalCarrierCost: number;
  }
}

export default {
  key: "thermalCarrierCost",
  resolve: (ctx) => {
    const data = ctx.get("primaryEnergyCarrierData");
    return ctx.get("thermalCarrierConsumption") * ctx.get("thermalUnitRate") + data.baseRate;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalCarrierCost"
>;
