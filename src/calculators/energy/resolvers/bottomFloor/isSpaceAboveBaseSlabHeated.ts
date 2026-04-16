import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    isSpaceAboveBaseSlabHeated: boolean;
  }
}

export default {
  key: "isSpaceAboveBaseSlabHeated",
  resolve: (ctx) => {
    if (!ctx.get("hasBasement")) return true;
    return ctx.get("isBasementHeated");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "isSpaceAboveBaseSlabHeated"
>;
