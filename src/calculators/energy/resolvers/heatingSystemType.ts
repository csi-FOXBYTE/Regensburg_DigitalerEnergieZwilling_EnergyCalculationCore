import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";

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
    return ctx.input.config.heat.defaultHeatingSystemType;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "heatingSystemType"
>;
