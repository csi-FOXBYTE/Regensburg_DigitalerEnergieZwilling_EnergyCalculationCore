import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    heatingSurfaceType: string;
  }
}

export default {
  key: "heatingSurfaceType",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSurfaceType;
    if (override != null) return override;
    return ctx.input.config.heat.defaultHeatingSurfaceType;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingSurfaceType"
>;
