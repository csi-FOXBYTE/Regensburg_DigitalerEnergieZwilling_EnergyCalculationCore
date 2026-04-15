import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabArea: number;
  }
}

export default {
  key: "baseSlabArea",
  resolve: (ctx) => ctx.input.input.baseSlab.area,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabArea"
>;
