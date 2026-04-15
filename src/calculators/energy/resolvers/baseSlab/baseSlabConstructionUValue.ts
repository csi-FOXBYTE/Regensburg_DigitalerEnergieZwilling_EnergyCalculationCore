import type { Resolver } from "../../../../engine/index.js";
import type { DETCalculatorRegistry, DETCalculatorContext } from "../../";
import { resolveKeyedValue } from "../../../../types/keyed-values.js";
import { resolveYearBand } from "../../../../types/range-bands.js";

declare module "../../" {
  interface DETCalculatorRegistry {
    baseSlabConstructionUValue: number;
  }
}

export default {
  key: "baseSlabConstructionUValue",
  resolve: (ctx) => {
    const yearBands = resolveKeyedValue(
      ctx.input.config.baseSlab.uValue,
      ctx.get("baseSlabConstructionType"),
    );
    const result = resolveYearBand(yearBands, ctx.get("buildingYear"));
    if (result == null) throw new Error("Failed to resolve baseSlabConstructionUValue");
    return result;
  },
} satisfies Resolver<
  DETCalculatorContext,
  DETCalculatorRegistry,
  "baseSlabConstructionUValue"
>;
