import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hasBioGas: boolean;
  }
}

export default {
  key: "hasBioGas",
  resolve: (ctx) => ctx.input.input.heat.hasBioGas ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasBioGas"
>;
