import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hasStorage: boolean;
  }
}

export default {
  key: "hasStorage",
  resolve: (ctx) => ctx.input.input.heat.hasStorage ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasStorage"
>;
