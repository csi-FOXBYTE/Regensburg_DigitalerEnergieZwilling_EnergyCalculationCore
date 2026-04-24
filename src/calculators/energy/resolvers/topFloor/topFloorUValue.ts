import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorUValue: number;
  }
}

export default {
  key: "topFloorUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.topFloor.uValue;
    if (override != null) return override;
    return 1 / ctx.get("topFloorThermalResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorUValue"
>;
