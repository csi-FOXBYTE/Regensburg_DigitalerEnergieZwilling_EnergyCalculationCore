import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorHeatLossFactor: number;
  }
}

export default {
  key: "topFloorHeatLossFactor",
  resolve: (ctx) => ctx.input.config.topFloor.heatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorHeatLossFactor"
>;
