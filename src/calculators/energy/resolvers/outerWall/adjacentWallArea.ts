import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    adjacentWallArea: number;
  }
}

export default {
  key: "adjacentWallArea",
  resolve: (ctx) => ctx.input.input.outerWall.adjacentWallArea ?? 0,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "adjacentWallArea"
>;
