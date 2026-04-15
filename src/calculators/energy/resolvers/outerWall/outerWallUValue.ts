import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallUValue: number;
  }
}

export default {
  key: "outerWallUValue",
  resolve: (ctx) => 1 / ctx.get("outerWallThermalResistance"),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallUValue"
>;
