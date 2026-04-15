import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallHasInsulation: boolean;
  }
}

export default {
  key: "outerWallHasInsulation",
  resolve: (ctx) => ctx.input.input.outerWall.hasInsulation ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallHasInsulation"
>;
