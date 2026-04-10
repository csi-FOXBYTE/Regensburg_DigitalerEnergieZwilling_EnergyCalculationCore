import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatLossSum: number;
  }
}

export default {
  key: "heatLossSum",
  // TODO: add remaining surface heat loss components (OGD, exterior walls, UGD)
  resolve: (ctx) =>
    ctx.get("ventilationHeatLoss") +
    ctx.get("roofHeatLoss") +
    ctx.get("roofWindowsHeatLoss") +
    ctx.get("exteriorWallWindowsHeatLoss"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatLossSum"
>;
