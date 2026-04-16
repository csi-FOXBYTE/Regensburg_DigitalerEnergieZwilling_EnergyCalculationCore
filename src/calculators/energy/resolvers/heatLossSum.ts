import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatLossSum: number;
  }
}

export default {
  key: "heatLossSum",
  resolve: (ctx) =>
    ctx.get("ventilationHeatLoss") +
    (ctx.get("isSpaceBelowRoofHeated") ? ctx.get("roofHeatLoss") : ctx.get("topFloorHeatLoss")) +
    ctx.get("roofWindowsHeatLoss") +
    ctx.get("exteriorWallWindowsHeatLoss") +
    ctx.get("outerWallHeatLoss") +
    ctx.get("bottomFloorHeatLoss"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatLossSum"
>;
