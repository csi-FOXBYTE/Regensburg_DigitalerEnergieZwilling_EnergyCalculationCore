import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hasGasSupply: boolean;
  }
}

export default {
  key: "hasGasSupply",
  resolve: (ctx) => ctx.input.input.heat.hasGasSupply ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasGasSupply"
>;
