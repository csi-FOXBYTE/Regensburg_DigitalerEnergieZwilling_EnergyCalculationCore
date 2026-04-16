import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    bottomFloorIsHeated: boolean;
  }
}

export default {
  key: "bottomFloorIsHeated",
  resolve: (ctx) => ctx.input.input.bottomFloor.isHeated ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "bottomFloorIsHeated"
>;
