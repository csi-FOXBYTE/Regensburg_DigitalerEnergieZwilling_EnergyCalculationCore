import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    primaryEnergyCarrier: string;
  }
}

export default {
  key: "primaryEnergyCarrier",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.primaryEnergyCarrier;
    if (override != null) return override;
    return ctx.input.config.heat.defaultPrimaryEnergyCarrier;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "primaryEnergyCarrier"
>;
