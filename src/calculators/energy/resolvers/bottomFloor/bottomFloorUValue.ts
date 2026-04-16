import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorUValue: number;
  }
}

export default {
  key: "bottomFloorUValue",
  resolve: (ctx) => 1 / ctx.get("bottomFloorThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorUValue"
>;
