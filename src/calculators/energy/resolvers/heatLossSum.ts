import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatLossSum: number;
  }
}

export default {
  key: "heatLossSum",
  // TODO: add remaining surface heat loss components (exterior walls, UGD)
  resolve: (ctx) =>
    ctx.get("ventilationHeatLoss") +
    ctx.get("roofHeatLoss") +
    ctx.get("roofWindowsHeatLoss") +
    ctx.get("exteriorWallWindowsHeatLoss") +
    ctx.get("topFloorHeatLoss"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatLossSum"
>;
