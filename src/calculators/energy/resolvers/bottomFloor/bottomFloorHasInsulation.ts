import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorHasInsulation: boolean;
  }
}

export default {
  key: "bottomFloorHasInsulation",
  resolve: (ctx) => ctx.input.input.bottomFloor.hasInsulation ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorHasInsulation"
>;
