import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorUValue: number;
  }
}

export default {
  key: "bottomFloorUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.bottomFloor.uValue;
    if (override != null) return override;
    return 1 / ctx.get("bottomFloorThermalResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorUValue"
>;
