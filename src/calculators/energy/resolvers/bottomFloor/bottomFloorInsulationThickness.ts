import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorInsulationThickness: number;
  }
}

export default {
  key: "bottomFloorInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.bottomFloor.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.bottomFloor.assumedInsulationThickness;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorInsulationThickness"
>;
