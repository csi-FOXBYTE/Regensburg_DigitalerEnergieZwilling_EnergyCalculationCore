import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    preRenovationHasInternalGains: boolean;
  }
}

export default {
  key: "preRenovationHasInternalGains",
  resolve: (ctx) => {
    const sysType =
      ctx.input.input.preRenovationValues?.heatingSystemType ??
      ctx.get("heatingSystemType");
    return resolveKeyedValue(ctx.input.config.heat.hasInternalGains, sysType);
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "preRenovationHasInternalGains"
>;
