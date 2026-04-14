import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorUValue: number;
  }
}

export default {
  key: "topFloorUValue",
  resolve: (ctx) => 1 / ctx.get("topFloorThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorUValue"
>;
