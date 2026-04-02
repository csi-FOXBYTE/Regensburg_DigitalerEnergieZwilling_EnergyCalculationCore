import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    livingArea: number | null;
  }
}

export default {
  key: "livingArea",
  resolve: (ctx) => ctx.input.input.general.livingArea ?? null,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "livingArea"
>;
