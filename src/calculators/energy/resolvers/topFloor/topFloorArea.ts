import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorArea: number;
  }
}

export default {
  key: "topFloorArea",
  resolve: (ctx) => ctx.input.input.topFloor.area,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorArea"
>;
