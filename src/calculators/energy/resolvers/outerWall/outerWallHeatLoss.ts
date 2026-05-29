import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallHeatLoss: number;
  }
}

export default {
  key: "outerWallHeatLoss",
  resolve: (ctx) => {
    const adjacentArea = ctx.get("adjacentWallArea");
    const freeArea = ctx.get("outerWallArea") - ctx.get("exteriorWallWindowsArea") - adjacentArea;
    return (
      freeArea * ctx.get("outerWallUValue") +
      adjacentArea * ctx.get("adjacentWallUValue")
    ) * ctx.get("outerWallHeatLossFactor");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallHeatLoss"
>;
