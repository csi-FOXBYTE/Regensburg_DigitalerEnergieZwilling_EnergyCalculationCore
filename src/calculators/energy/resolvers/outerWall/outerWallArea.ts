import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallArea: number;
  }
}

export default {
  key: "outerWallArea",
  resolve: (ctx) => ctx.input.input.outerWall.area,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallArea"
>;
