import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabHeatLossFactor: number;
  }
}

export default {
  key: "baseSlabHeatLossFactor",
  resolve: (ctx) => ctx.input.config.baseSlab.heatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabHeatLossFactor"
>;
