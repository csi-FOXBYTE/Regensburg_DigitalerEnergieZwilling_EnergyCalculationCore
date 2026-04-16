import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    isBasementHeated: boolean;
  }
}

export default {
  key: "isBasementHeated",
  resolve: (ctx) => ctx.input.input.bottomFloor.isBasementHeated ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "isBasementHeated"
>;
