import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationThickness: number;
  }
}

export default {
  key: "roofInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.roof.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.roof.assumedInsulationThickness;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofInsulationThickness"
>;
