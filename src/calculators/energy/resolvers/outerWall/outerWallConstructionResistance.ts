import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallConstructionResistance: number;
  }
}

export default {
  key: "outerWallConstructionResistance",
  resolve: (ctx) => 1 / ctx.get("outerWallConstructionUValue"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallConstructionResistance"
>;
