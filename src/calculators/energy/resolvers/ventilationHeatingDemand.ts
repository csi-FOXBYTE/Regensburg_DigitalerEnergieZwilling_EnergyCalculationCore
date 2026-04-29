import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    ventilationHeatingDemand: number;
  }
}

export default {
  key: "ventilationHeatingDemand",
  resolve: (ctx) =>
    ctx.get("ventilationHeatLoss") * ctx.get("heatingDegreeDays") * 0.024,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "ventilationHeatingDemand"
>;
