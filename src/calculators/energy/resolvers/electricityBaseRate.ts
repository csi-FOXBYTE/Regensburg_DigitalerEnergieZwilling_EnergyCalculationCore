import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    electricityBaseRate: number;
  }
}

export default {
  key: "electricityBaseRate",
  resolve: (ctx) => {
    const override = ctx.input.input.electricity.userElectricityBaseRate;
    if (override != null) return override;
    return ctx.get("electricityTypeData").baseRate;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricityBaseRate">;
