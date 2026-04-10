import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatEmitterType: string;
  }
}

export default {
  key: "heatEmitterType",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatEmitterType;
    if (override != null) return override;
    return ctx.input.config.heat.defaultHeatEmitterType;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatEmitterType"
>;
