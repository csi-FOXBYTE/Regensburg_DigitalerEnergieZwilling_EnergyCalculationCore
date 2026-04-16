import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorArea: number;
  }
}

export default {
  key: "bottomFloorArea",
  resolve: (ctx) => ctx.input.input.bottomFloor.area,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorArea"
>;
