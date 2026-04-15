import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabIsHeated: boolean;
  }
}

export default {
  key: "baseSlabIsHeated",
  resolve: (ctx) => ctx.input.input.baseSlab.isHeated ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabIsHeated"
>;
