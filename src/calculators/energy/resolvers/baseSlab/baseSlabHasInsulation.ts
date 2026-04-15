import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabHasInsulation: boolean;
  }
}

export default {
  key: "baseSlabHasInsulation",
  resolve: (ctx) => ctx.input.input.baseSlab.hasInsulation ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabHasInsulation"
>;
