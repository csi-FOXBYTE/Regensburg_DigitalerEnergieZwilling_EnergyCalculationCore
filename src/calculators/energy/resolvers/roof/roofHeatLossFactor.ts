import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    roofHeatLossFactor: number;
  }
}

export default {
  key: "roofHeatLossFactor",
  resolve: (ctx) => ctx.input.config.roof.heatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "roofHeatLossFactor"
>;
