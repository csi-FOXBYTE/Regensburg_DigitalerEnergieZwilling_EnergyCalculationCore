import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    heatingSystemType: string;
  }
}

export default {
  key: "heatingSystemType",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSystemType;
    if (override != null) return override;
    return resolveKeyedValue(
      ctx.input.config.heat.defaultHeatingSystemType,
      ctx.get("primaryEnergyCarrier"),
    );
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingSystemType"
>;
