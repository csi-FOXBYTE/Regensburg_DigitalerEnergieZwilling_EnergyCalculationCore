import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallInsulationThickness: number;
  }
}

export default {
  key: "outerWallInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.outerWall.assumedInsulationThickness;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallInsulationThickness"
>;
