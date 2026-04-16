import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";

declare module "../../" {
  interface DETCalculatorRegistry {
    isAtticHeated: boolean;
  }
}

export default {
  key: "isAtticHeated",
  resolve: (ctx) => ctx.input.input.topFloor.isAtticHeated ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "isAtticHeated"
>;
