import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatLossSum: number;
  }
}

export default {
  key: "heatLossSum",
  // TODO: add remaining heat loss components (e.g. transmission heat loss)
  resolve: (ctx) => ctx.get("ventilationHeatLoss"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatLossSum"
>;
