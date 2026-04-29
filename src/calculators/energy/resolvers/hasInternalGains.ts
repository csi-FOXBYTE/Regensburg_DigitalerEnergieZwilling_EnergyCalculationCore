import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    hasInternalGains: boolean;
  }
}

export default {
  key: "hasInternalGains",
  resolve: (ctx) =>
    resolveKeyedValue(
      ctx.input.config.heat.hasInternalGains,
      ctx.get("heatingSystemType"),
    ),
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "hasInternalGains"
>;
