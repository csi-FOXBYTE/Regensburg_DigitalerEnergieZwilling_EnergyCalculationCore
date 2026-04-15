import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofInsulationReductionFactor: number;
  }
}

export default {
  key: "roofInsulationReductionFactor",
  resolve: (ctx) => ctx.input.config.roof.insulationReductionFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofInsulationReductionFactor"
>;
