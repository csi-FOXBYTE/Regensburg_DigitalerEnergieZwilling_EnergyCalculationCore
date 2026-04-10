import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    co2Factor: number;
  }
}

export default {
  key: "co2Factor",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.co2Factor,
      ctx.get("primaryEnergyCarrier"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "co2Factor"
>;
