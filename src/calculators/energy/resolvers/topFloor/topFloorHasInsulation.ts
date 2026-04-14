import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    topFloorHasInsulation: boolean;
  }
}

export default {
  key: "topFloorHasInsulation",
  resolve: (ctx) => ctx.input.input.topFloor.hasInsulation ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "topFloorHasInsulation"
>;
