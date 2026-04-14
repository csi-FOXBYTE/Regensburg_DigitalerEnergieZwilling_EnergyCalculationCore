import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorInsulationThickness: number;
  }
}

export default {
  key: "topFloorInsulationThickness",
  resolve: (ctx) => {
    const override = ctx.input.input.topFloor.insulationThickness;
    if (override != null) return override;
    return ctx.input.config.topFloor.assumedInsulationThickness;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorInsulationThickness"
>;
