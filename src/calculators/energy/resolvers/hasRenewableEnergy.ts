import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

declare module "../" {
  interface DETCalculatorRegistry {
    hasRenewableEnergy: boolean;
  }
}

export default {
  key: "hasRenewableEnergy",
  resolve: (ctx) => ctx.input.input.electricity.hasRenewableEnergy ?? false,
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasRenewableEnergy"
>;
