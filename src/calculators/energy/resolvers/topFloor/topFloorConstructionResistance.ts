import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorConstructionResistance: number;
  }
}

export default {
  key: "topFloorConstructionResistance",
  resolve: (ctx) => 1 / ctx.get("topFloorConstructionUValue"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorConstructionResistance"
>;
