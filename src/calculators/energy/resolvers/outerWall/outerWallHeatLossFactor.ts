import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallHeatLossFactor: number;
  }
}

export default {
  key: "outerWallHeatLossFactor",
  resolve: (ctx) => ctx.input.config.outerWall.heatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallHeatLossFactor"
>;
