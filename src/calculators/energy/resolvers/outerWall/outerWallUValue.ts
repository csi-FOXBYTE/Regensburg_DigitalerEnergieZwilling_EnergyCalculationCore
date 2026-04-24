import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    outerWallUValue: number;
  }
}

export default {
  key: "outerWallUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.outerWall.uValue;
    if (override != null) return override;
    return 1 / ctx.get("outerWallThermalResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "outerWallUValue"
>;
