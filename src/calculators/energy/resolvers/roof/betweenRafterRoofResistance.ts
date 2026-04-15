import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    betweenRafterRoofResistance: number;
  }
}

export default {
  key: "betweenRafterRoofResistance",
  resolve: (ctx) =>
    ctx.get("roofInsulationResistance") /
    (ctx.get("roofInsulationReductionFactor") + 1),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "betweenRafterRoofResistance"
>;
