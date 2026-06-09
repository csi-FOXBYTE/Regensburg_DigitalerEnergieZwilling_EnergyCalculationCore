import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import { resolveKeyedValue } from "../../../types/keyed-values.js";

declare module "../" {
  interface DETCalculatorRegistry {
    hasInternalGains: boolean;
    internalGainsFactor: number;
    effectiveHeatingDemand: number;
  }
}

export const hasInternalGains = {
  key: "hasInternalGains",
  resolve: (ctx) =>
    resolveKeyedValue(ctx.input.config.heat.hasInternalGains, ctx.get("heatingSystemType")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hasInternalGains">;

export const internalGainsFactor = {
  key: "internalGainsFactor",
  resolve: (ctx) => {
    if (!ctx.get("hasInternalGains")) return 1;
    return resolveKeyedValue(
      ctx.input.config.heat.internalGainsFactorByBuildingType,
      ctx.get("buildingType"),
    );
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "internalGainsFactor">;

export const effectiveHeatingDemand = {
  key: "effectiveHeatingDemand",
  resolve: (ctx) => ctx.get("totalEnergyDemand") * ctx.get("internalGainsFactor"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "effectiveHeatingDemand">;

export default [hasInternalGains, internalGainsFactor, effectiveHeatingDemand];
