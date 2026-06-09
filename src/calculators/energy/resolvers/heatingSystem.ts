import type { Resolver } from "../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../";
import type { RangeKey } from "../../../types/range-bands.js";
import { resolveKeyedValue } from "../../../types/keyed-values.js";
import { resolveRangeBand } from "../../../types/range-bands.js";

declare module "../" {
  interface DETCalculatorRegistry {
    hasGasSupply: boolean;
    hasBioGas: boolean;
    hasStorage: boolean;
    heatingSystemType: string;
    heatingSystemConstructionYear: number | RangeKey;
    heatingSurfaceType: string;
    heatingPerformanceFactor: number;
    temperatureControlPerformanceFactor: number;
    combinedHeatingPerformanceFactor: number;
    electricalRatio: number;
  }
}

export const hasGasSupply = {
  key: "hasGasSupply",
  resolve: (ctx) => ctx.input.input.heat.hasGasSupply ?? false,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hasGasSupply">;

export const hasBioGas = {
  key: "hasBioGas",
  resolve: (ctx) => ctx.input.input.heat.hasBioGas ?? false,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hasBioGas">;

export const hasStorage = {
  key: "hasStorage",
  resolve: (ctx) => ctx.input.input.heat.hasStorage ?? false,
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "hasStorage">;

export const heatingSystemType = {
  key: "heatingSystemType",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSystemType;
    if (override != null) return override;
    return resolveKeyedValue(
      ctx.input.config.heat.defaultHeatingSystemType,
      ctx.get("primaryEnergyCarrier"),
    );
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatingSystemType">;

export const heatingSystemConstructionYear = {
  key: "heatingSystemConstructionYear",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSystemConstructionYear;
    if (override != null) return override;
    return ctx.get("buildingYear");
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatingSystemConstructionYear">;

export const heatingSurfaceType = {
  key: "heatingSurfaceType",
  resolve: (ctx) => {
    const override = ctx.input.input.heat.heatingSurfaceType;
    if (override != null) return override;
    return ctx.input.config.heat.defaultHeatingSurfaceType;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatingSurfaceType">;

export const heatingPerformanceFactor = {
  key: "heatingPerformanceFactor",
  resolve: (ctx) => {
    const byEmitterType = resolveKeyedValue(
      ctx.input.config.heat.heatingPerformanceFactor,
      ctx.get("heatingSystemType"),
    );
    const byYear = resolveRangeBand(byEmitterType, ctx.get("heatingSystemConstructionYear"));
    if (byYear == null) throw new Error("Failed to resolve heatingPerformanceFactor for given year");
    const result = resolveRangeBand(byYear, ctx.get("usableFloorArea"));
    if (result == null) throw new Error("Failed to resolve heatingPerformanceFactor for given floor area");
    return result;
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "heatingPerformanceFactor">;

export const temperatureControlPerformanceFactor = {
  key: "temperatureControlPerformanceFactor",
  resolve: (ctx) => {
    const byEmitterType = resolveKeyedValue(
      ctx.input.config.heat.temperatureControlPerformanceFactor,
      ctx.get("heatingSystemType"),
    );
    const byYear = resolveRangeBand(byEmitterType, ctx.get("heatingSystemConstructionYear"));
    if (byYear == null) throw new Error("Failed to resolve temperatureControlPerformanceFactor for given year");
    return resolveKeyedValue(byYear, ctx.get("heatingSurfaceType"));
  },
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "temperatureControlPerformanceFactor">;

export const combinedHeatingPerformanceFactor = {
  key: "combinedHeatingPerformanceFactor",
  resolve: (ctx) =>
    ctx.get("heatingPerformanceFactor") * ctx.get("temperatureControlPerformanceFactor"),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "combinedHeatingPerformanceFactor">;

export const electricalRatio = {
  key: "electricalRatio",
  resolve: (ctx) =>
    resolveKeyedValue(ctx.input.config.heat.electricalRatio, ctx.get("heatingSystemType")),
} satisfies Resolver<DETCalculatorContext, DETCalculatorRegistry, "electricalRatio">;

export default [
  hasGasSupply,
  hasBioGas,
  hasStorage,
  heatingSystemType,
  heatingSystemConstructionYear,
  heatingSurfaceType,
  heatingPerformanceFactor,
  temperatureControlPerformanceFactor,
  combinedHeatingPerformanceFactor,
  electricalRatio,
];
