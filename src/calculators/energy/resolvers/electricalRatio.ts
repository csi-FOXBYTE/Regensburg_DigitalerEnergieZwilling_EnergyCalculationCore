import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    electricalRatio: number;
  }
}

export default {
  key: "electricalRatio",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.electricalRatio,
      ctx.get("heatingSystemType"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "electricalRatio"
>;
