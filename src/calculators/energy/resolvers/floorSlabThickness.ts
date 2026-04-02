import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    floorSlabThickness: number;
  }
}

export default {
  key: "floorSlabThickness",
  resolve: (ctx) => ctx.input.config.general.assumedFloorSlabThickness,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "floorSlabThickness"
>;
