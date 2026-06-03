import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    thermalCarrierCost: number;
  }
}

export default {
  key: "thermalCarrierCost",
  resolve: (ctx) =>
    ctx.get("thermalCarrierConsumption") * ctx.get("thermalUnitRate") + ctx.get("thermalBaseRate"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "thermalCarrierCost"
>;
