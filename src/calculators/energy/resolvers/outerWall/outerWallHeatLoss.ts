import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallHeatLoss: number;
  }
}

export default {
  key: "outerWallHeatLoss",
  resolve: (ctx) =>
    ctx.get("outerWallArea") *
    ctx.get("outerWallUValue") *
    ctx.get("outerWallHeatLossFactor"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallHeatLoss"
>;
