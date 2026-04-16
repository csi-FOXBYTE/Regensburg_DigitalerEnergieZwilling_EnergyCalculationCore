import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    isSpaceBelowRoofHeated: boolean;
  }
}

export default {
  key: "isSpaceBelowRoofHeated",
  resolve: (ctx) => {
    if (!ctx.get("hasAttic")) return true;
    return ctx.get("isAtticHeated");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "isSpaceBelowRoofHeated"
>;
