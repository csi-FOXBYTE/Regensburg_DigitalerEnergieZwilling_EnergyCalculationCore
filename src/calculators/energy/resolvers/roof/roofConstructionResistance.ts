import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofConstructionResistance: number;
  }
}

export default {
  key: "roofConstructionResistance",
  resolve: (ctx) => 1 / ctx.get("roofConstructionUValue"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofConstructionResistance"
>;
