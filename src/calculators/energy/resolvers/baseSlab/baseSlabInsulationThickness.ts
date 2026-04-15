import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabInsulationThickness: number;
  }
}

export default {
  key: "baseSlabInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.baseSlab.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.baseSlab.assumedInsulationThickness;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabInsulationThickness"
>;
