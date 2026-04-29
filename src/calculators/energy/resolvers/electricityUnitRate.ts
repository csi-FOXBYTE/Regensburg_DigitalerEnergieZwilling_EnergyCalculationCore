import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityUnitRate: number;
  }
}

export default {
  key: "electricityUnitRate",
  resolve: (ctx) => {
    const override = ctx.input.input.electricity.electricityUnitRate;
    if (override != null) return override;
    return ctx.get("electricityTypeData").unitRate;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricityUnitRate"
>;
