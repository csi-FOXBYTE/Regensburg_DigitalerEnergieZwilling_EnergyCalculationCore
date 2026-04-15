import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofUValue: number;
  }
}

export default {
  key: "roofUValue",
  resolve: (ctx) => 1 / ctx.get("roofTotalThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofUValue"
>;
