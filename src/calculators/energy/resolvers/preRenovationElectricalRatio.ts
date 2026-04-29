import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    preRenovationElectricalRatio: number;
  }
}

export default {
  key: "preRenovationElectricalRatio",
  resolve: (ctx) => {
    const sysType =
      ctx.input.input.heat.preRenovationHeatingSystemType ??
      ctx.get("heatingSystemType");
    return resolveKeyedValue(ctx.input.config.heat.electricalRatio, sysType);
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "preRenovationElectricalRatio"
>;
