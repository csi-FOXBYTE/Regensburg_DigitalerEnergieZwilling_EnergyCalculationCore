import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    totalCost: number;
  }
}

export default {
  key: "totalCost",
  resolve: (ctx) =>
    ctx.get("thermalCarrierCost") + ctx.get("electricityCost"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "totalCost"
>;
