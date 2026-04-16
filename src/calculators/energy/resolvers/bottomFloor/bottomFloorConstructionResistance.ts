import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorConstructionResistance: number;
  }
}

export default {
  key: "bottomFloorConstructionResistance",
  resolve: (ctx) => 1 / ctx.get("bottomFloorConstructionUValue"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorConstructionResistance"
>;
