import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabConstructionResistance: number;
  }
}

export default {
  key: "baseSlabConstructionResistance",
  resolve: (ctx) => 1 / ctx.get("baseSlabConstructionUValue"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabConstructionResistance"
>;
