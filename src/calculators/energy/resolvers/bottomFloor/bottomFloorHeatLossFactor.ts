import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorHeatLossFactor: number;
  }
}

export default {
  key: "bottomFloorHeatLossFactor",
  resolve: (ctx) => ctx.input.config.bottomFloor.heatLossFactor,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorHeatLossFactor"
>;
