import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofUValue: number;
  }
}

export default {
  key: "roofUValue",
  resolve: (ctx) => {
    const override = ctx.input.input.roof.uValue;
    if (override != null) return override;
    return 1 / ctx.get("roofTotalThermalResistance");
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofUValue"
>;
