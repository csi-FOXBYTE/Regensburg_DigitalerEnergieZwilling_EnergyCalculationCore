import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    isTopFloorHeated: boolean;
  }
}

export default {
  key: "isTopFloorHeated",
  resolve: (ctx) => ctx.input.input.topFloor.isTopFloorHeated ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "isTopFloorHeated"
>;
